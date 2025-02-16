import { z } from "zod";
import { createTRPCRouter, ProtectedProcedure } from "../init";
// import { TRPCError } from "@trpc/server";
export const appRouter = createTRPCRouter({
  hello: ProtectedProcedure.input(
    z.object({
      text: z.string(),
    })
  ).query((opts) => {
    console.log({ dbUser: opts.ctx.user });
    // throw new TRPCError({ code: "BAD_REQUEST" });
    return {
      greeting: `hello ${opts.input.text}`,
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
