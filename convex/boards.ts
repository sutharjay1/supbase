import { v } from "convex/values"
import { query } from "./_generated/server";


export const get = query({
    args: {
        orgId: v.string(),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }

        const boards = await ctx.db.query("boards").withIndex("bg_org", (query) => query.eq("orgId", args.orgId)).collect();

        return boards;

    }
})