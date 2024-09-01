import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server";

const images = ["https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1910231/pexels-photo-1910231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/735812/pexels-photo-735812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/32997/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/2881262/pexels-photo-2881262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const boards = await ctx.db.insert("boards", {
            orgId: args.orgId,
            title: args.title,
            authorId: user.subject,
            authorName: user.name!,
            imageUrl: randomImage,
        });


        console.log(boards)

        const newBoard = await ctx.db.get(boards);

        return { id: newBoard?._id };

    }
})

export const remove = mutation({
    args: {
        id: v.id("boards"),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }




        const exisitingFavorite = await ctx.db.query("userFavorites").withIndex("by_user_board", (query) => query.eq("boardId", args.id).eq("userId", user.subject)).unique();

        if (exisitingFavorite) {
            await ctx.db.delete(exisitingFavorite._id);
        }

        const board = await ctx.db.delete(args.id);

        return board;

    }
})

export const renameBoard = mutation({
    args: {
        id: v.id("boards"),
        title: v.string(),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        const title = args.title.trim();

        if (!title) {
            throw new Error("Title cannot be empty");
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters");
        }

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }

        const board = await ctx.db.patch(args.id, {
            title,
        });

        return board;
    }
})

export const favorite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = user.subject

        const existingFavorite = await ctx.db.query("userFavorites").withIndex("by_user_board_org", (query) => query.eq("boardId", args.id).eq("userId", userId).eq("orgId", args.orgId)).unique();

        if (existingFavorite) {
            throw new Error("Board already favorited");
        }



        const favorite = await ctx.db.insert("userFavorites", {
            boardId: args.id,
            userId,
            orgId: args.orgId,
        });

        return favorite;

    }
})

export const unfavorite = mutation({
    args: {
        id: v.id("boards"),
    }, handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("UNAUTHORIZED");
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = user.subject

        const existingFavorite = await ctx.db.query("userFavorites").withIndex("by_user_board", (query) => query
            .eq("boardId", args.id)
            .eq("userId", userId)
        )
            .unique();

        if (!existingFavorite) {
            throw new Error("Favorited board not found");
        }



        const favorite = await ctx.db.delete(existingFavorite._id);

        return favorite;

    }
})

export const get = query({
    args: {
        id: v.id("boards"),
    }, handler: async (ctx, args) => {

        const board = await ctx.db.get(args.id);

        return board
    }
})