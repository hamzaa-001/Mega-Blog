import mongoose, { Schema, model, models } from "mongoose";

const blogSchema = new Schema({
  blog_imgPath: {
    type: String,
    required: true,
  },
  blog_title: {
    type: String,
    required: true,
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
});

export const Blog = models["mega-blogs"] || model("mega-blogs", blogSchema);
