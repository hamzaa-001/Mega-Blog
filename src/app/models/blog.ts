import mongoose, { Schema, model, models } from "mongoose";

const blogSchema = new Schema({
  blog_imgPath: {
    type: String,
  },
  blog_title: {
    type: String,
  },
  author_avatar: {
    type: String,
  },
  author: {
    type: String,
  },
  blog_content: {
    type: String,
  },
  created_at: {
    type: String,
  },
  category: {
    type: String,
  },
});

export const Blog = models["mega-blogs"] || model("mega-blogs", blogSchema);
