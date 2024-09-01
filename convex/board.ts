import { v } from "convex/values"
import { mutation } from "./_generated/server";

const images = ["https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1910231/pexels-photo-1910231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/735812/pexels-photo-735812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]

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

        return boards;

    }
})