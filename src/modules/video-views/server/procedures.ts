import { db } from "@/db";
import { videoViews } from "@/db/schema";
import { createTRPCRouter, ProtectedProcedure } from "@/trpc/init";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const videoViewsRouter = createTRPCRouter({
  //   view would be count as for only logged in user in thes mechanism if i want to include also for non loggin user i can also do that
  //and only if user has viewed the video once and if he/she view again hunderd time count would remain the same

  //mechanish to create like only view is count if user watched  videos for 30sec than constant refresh of browser window does not count as a view

  create: ProtectedProcedure.input(
    z.object({ videoId: z.string().uuid() })
  ).mutation(async ({ input, ctx }) => {
    const { videoId } = input;
    const { id: userId } = ctx.user;
    const [existingVideoView] = await db
      .select()
      .from(videoViews)
      .where(
        and(eq(videoViews.videoId, videoId), eq(videoViews.userId, userId))
      );
    if (existingVideoView) {
      return existingVideoView;
    }
    const [createdVideoView] = await db
      .insert(videoViews)
      .values({ userId, videoId })
      .returning();
    return createdVideoView;
  }),
});
