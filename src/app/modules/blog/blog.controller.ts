import { Request } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { BlogService } from "./blog.service";
import { sendResponse } from "../../shared/sendResponse";
import { httpStatus } from "../../interface/httpStatus";
import { sendImageToCloudinary } from "../../utils/fileUploader";

const createBlog = catchAsync(async (req, res) => {
  const payload = req.body;
  console.log("file", req.file);
  // console.log(req.body);
  if (req?.file) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
    const imageName = `${uniqueSuffix}-${req.user?.email.split("@")[0]}`;
    const path = req.file.buffer;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url;
  }

  const result = await BlogService.createBlog(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
    data: result,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const result = await BlogService.getBlogById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogs(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All blogs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const payload = req.body;

  // Fetch existing blog data
  const existingBlog = await BlogService.getBlogById(req.params.id);

  // If a new image is uploaded
  if (req?.file) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
    const imageName = `${uniqueSuffix}-${req.user?.email.split("@")[0]}`;
    const path = req.file?.buffer;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url;
  } else {
    // Reuse existing blog image if no new image uploaded
    payload.image = existingBlog?.image;
  }

  const result = await BlogService.updateBlog(req.params.id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await BlogService.deleteBlog(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: []
  });
});

export const BlogController = {
  createBlog,
  getBlogById,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
 