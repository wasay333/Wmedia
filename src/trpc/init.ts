import { db } from "@/db";
import { users } from "@/db/schema";
import { ratelimit } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";
export const createTRPCContext = cache(async () => {
  const { userId } = await auth();
  console.log("TRPC Context Clerk User ID:", userId);
  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const BaseProcedure = t.procedure;
export const ProtectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  const { ctx } = opts;
  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, ctx.clerkUserId))
    .limit(1);
  if (!user) {
    console.error(
      "Unauthorized: User not found for clerkUserId:",
      ctx.clerkUserId
    );
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const { success } = await ratelimit.limit(user.id);
  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }
  return opts.next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
