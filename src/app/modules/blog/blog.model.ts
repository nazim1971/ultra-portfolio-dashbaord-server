import mongoose, { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Blog = model<TBlog>("Blog", blogSchema);
export default Blog;
