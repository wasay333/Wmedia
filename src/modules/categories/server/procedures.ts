import { db } from "@/db";
import { categories } from "@/db/schema";
import { BaseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: BaseProcedure.query(async () => {
    const data = await db.select().from(categories);
    return data;
  }),
});
