import { z } from "zod";

export const createBlog = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  image: z.string().url().optional(),
});

export const updateBlog = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(20).optional(),
  image: z.string().url().optional(),
});

export const BlogValidation = {
  createBlog,
  updateBlog,
};
