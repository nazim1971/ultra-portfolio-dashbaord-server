"use strict";
// blog.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importDefault(require("../../../middlewires/auth"));
const user_constant_1 = require("../user/user.constant");
const photoUploader_1 = require("../../utils/photoUploader");
const validateRequest_1 = __importDefault(require("../../../middlewires/validateRequest"));
// multer middleware
exports.BlogRoute = (0, express_1.Router)();
// ✅ Create Blog
exports.BlogRoute.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), ...(0, photoUploader_1.parseSingleImageWithData)(), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlog), blog_controller_1.BlogController.createBlog);
// ✅ Get Single Blog
exports.BlogRoute.get("/:id", blog_controller_1.BlogController.getBlogById);
// ✅ Get All Blogs
exports.BlogRoute.get("/", blog_controller_1.BlogController.getAllBlogs);
// ✅ Update Blog
exports.BlogRoute.patch("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), ...(0, photoUploader_1.parseSingleImageWithData)(), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlog), blog_controller_1.BlogController.updateBlog);
// ✅ Delete Blog
exports.BlogRoute.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), blog_controller_1.BlogController.deleteBlog);
