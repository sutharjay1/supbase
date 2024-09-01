import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { title } from "process";

export default defineSchema({
    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
    }).index("bg_org", ["orgId"]).searchIndex("search_title", {
        searchField: "title",
        filterFields: ["orgId"]
    }),
})