import { v } from "convex/values"
import { query } from "./_generated/server";


export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }
        const title = args.search as string;

        let boards = []


        if (title) {
            boards = await ctx.db.query("boards").withSearchIndex("search_title", query => query.search("title", title).eq("orgId", args.orgId)).collect();
        }
        else {

            boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (query) => query
                    .eq("orgId", args.orgId))
                .order("desc")
                .collect();

        }
        const boardsWithFavoriteRelation = boards.map((board) => {
            return ctx.db.query("userFavorites").withIndex("by_user_board", (query) => query.eq("boardId", board._id).eq("userId", user.subject)).unique().then((favorite) => {
                return { ...board, isFavorite: !!favorite };
            })
        })

        const boardsWithFavoriteBoolean = await Promise.all(boardsWithFavoriteRelation);

        return boardsWithFavoriteBoolean

    }
})