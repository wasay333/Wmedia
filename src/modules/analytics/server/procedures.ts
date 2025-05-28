import { db } from "@/db";
import {
  users,
  subscriptions,
  videos,
  videoViews,
  videoReactions,
} from "@/db/schema";
import {
  BaseProcedure,
  createTRPCRouter,
  ProtectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, inArray, lt, or, sql } from "drizzle-orm";
import { z } from "zod";

export const analyticsRouter = createTRPCRouter({
  getUserDetails: BaseProcedure.query(async ({ ctx }) => {
    const { clerkUserId } = ctx;
    let userId;

    // Fetch user by clerk ID
    const [user] = await db
      .select({ id: users.id, name: users.name })
      .from(users)
      .where(inArray(users.clerkId, clerkUserId ? [clerkUserId] : []));

    if (user) {
      userId = user.id;
    }
    if (!userId) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    // CTE for viewer subscriptions
    const viewerSubscriptions = db
      .$with("viewer_subscriptions")
      .as(
        db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.viewerId, userId))
      );

    // CTE for total video views (fixed alias)
    const userVideoViews = db.$with("user_video_views").as(
      db
        .select({
          totalViews: sql<number>`COUNT(*) AS "totalViews"`, // Correct alias
        })
        .from(videoViews)
        .innerJoin(videos, eq(videoViews.videoId, videos.id))
        .where(eq(videos.userId, userId))
    );
    // ✅ CTE for total likes on user's videos
    const userVideoLikes = db.$with("user_video_likes").as(
      db
        .select({
          totalLikes: sql<number>`COUNT(*) AS "totalLikes"`,
        })
        .from(videoReactions)
        .innerJoin(videos, eq(videoReactions.videoId, videos.id))
        .where(
          and(
            eq(videos.userId, userId),
            eq(videoReactions.type, "like") // Only count likes
          )
        )
    );
    // Fetch user analytics with CTEs
    const [existingUser] = await db
      .with(viewerSubscriptions, userVideoViews, userVideoLikes)
      .select({
        name: users.name,
        videoCount: db.$count(videos, eq(videos.userId, users.id)),
        subscriberCount: db.$count(
          subscriptions,
          eq(subscriptions.creatorId, users.id)
        ),
        totalViews: sql<number>`(SELECT "totalViews" FROM user_video_views)`, // Fix reference
        totalLikes: sql<number>`(SELECT "totalLikes" FROM user_video_likes)`, // ✅ Total likes added
      })
      .from(users)
      .leftJoin(
        viewerSubscriptions,
        eq(viewerSubscriptions.creatorId, users.id)
      )
      .where(eq(users.id, userId));

    if (!existingUser) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return existingUser;
  }),
  getUserVideos: ProtectedProcedure.input(
    z.object({
      cursor: z
        .object({
          id: z.string().uuid(),
          updatedAt: z.date(),
        })
        .nullish(),
      limit: z.number().min(1).max(100),
    })
  ).query(async ({ input, ctx }) => {
    const userId = ctx.user.id; // Get authenticated user ID from session
    const { cursor, limit } = input;
    const results = await db
      .select({
        videoId: videos.id,
        title: videos.title,
        description: videos.description,
        thumbnailUrl: videos.thumbnailUrl,
        createdAt: videos.createdAt,
        viewCount: sql<number>`COUNT(DISTINCT ${videoViews.userId})`,
        likeCount: sql<number>`COUNT(DISTINCT ${videoReactions.userId})`,
        updatedAt: videos.updatedAt, // Ensure updatedAt is selected for cursor-based pagination
      })
      .from(videos)
      .leftJoin(videoViews, eq(videos.id, videoViews.videoId))
      .leftJoin(
        videoReactions,
        and(
          eq(videos.id, videoReactions.videoId),
          eq(videoReactions.type, "like")
        )
      )
      .where(
        and(
          eq(videos.userId, userId),
          eq(videos.visibility, "public"),
          cursor
            ? or(
                lt(videos.updatedAt, cursor.updatedAt),
                and(
                  eq(videos.updatedAt, cursor.updatedAt),
                  lt(videos.id, cursor.id)
                )
              )
            : undefined
        )
      )
      .groupBy(videos.id)
      .orderBy(
        sql`COUNT(DISTINCT ${videoViews.userId}) DESC`,
        sql`COUNT(DISTINCT ${videoReactions.userId}) DESC`
      )
      //add 1 to the limit to check if there is more data
      .limit(limit + 1);
    const hasMore = results.length > limit;
    //remove the last item if there is more data
    const items = hasMore ? results.slice(0, -1) : results;
    //Set the next cursor to the last item if there is more data
    const lastItem = items[items.length - 1];
    const nextCursor = hasMore
      ? {
          id: lastItem.videoId,
          updatedAt: lastItem.updatedAt,
        }
      : null;

    return {
      items,
      nextCursor,
    };
  }),
});
