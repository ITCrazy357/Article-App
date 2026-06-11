import mongoose from "mongoose";

export const articleSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    categoryId: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true },
);

export const Article = mongoose.model("Article", articleSchema, "articles");

export default Article;
