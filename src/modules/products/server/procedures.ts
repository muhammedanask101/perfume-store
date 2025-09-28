import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const productsRouter = createTRPCRouter({
    getMany: baseProcedure.input(
        z.object({
            category: z.string().nullable().optional(),
    })
    ).query(async ({ ctx, input }) => {
        if(input.category){
            const categoriesData = await ctx.db.find({
                collection: "categories",
                limit: 1,
                pagination: false,
                where: {
                    slug: {
                        equals: input.category,
                    }
                }
            })
        }

        const category = categoriesData.docs[0];

        const data = await ctx.db.find({
        collection: 'products',
        depth: 1, //populate categories, image.
    })

        return data;
    }),
})