import { v } from "convex/values"
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string()),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }

        if (args.favorites) {
            const favoriteBoards = await ctx.db.query("userFavorites").withIndex("by_user_org", (query) => query.eq("userId", user.subject).eq("orgId", args.orgId)).order("desc").collect();


            const ids = favoriteBoards.map((board) => board.boardId);

            const boards = await getAllOrThrow(ctx.db, ids);

            return boards.map((board) => {
                return { ...board, isFavorite: true };
            })
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