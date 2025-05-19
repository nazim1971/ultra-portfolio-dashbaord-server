// blog.route.ts

import express, { Router } from "express";
import { BlogController } from "./blog.controller";
import { BlogValidation } from "./blog.validation";
import auth from "../../../middlewires/auth";
import { USER_ROLE } from "../user/user.constant";
import { parseMultipleImagesWithData, parseSingleImageWithData } from "../../utils/photoUploader";
import validateRequest from "../../../middlewires/validateRequest";
// multer middleware

export const BlogRoute = Router();

// ✅ Create Blog
BlogRoute.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ...parseSingleImageWithData(),
  validateRequest(BlogValidation.createBlog),
  BlogController.createBlog
);

// ✅ Get Single Blog
BlogRoute.get("/:id", BlogController.getBlogById);

// ✅ Get All Blogs
BlogRoute.get("/", BlogController.getAllBlogs);

// ✅ Update Blog
BlogRoute.patch(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ...parseSingleImageWithData(),
  validateRequest(BlogValidation.updateBlog),
  BlogController.updateBlog
);

// ✅ Delete Blog
BlogRoute.delete(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BlogController.deleteBlog
);
