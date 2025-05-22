"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const blog_service_1 = require("./blog.service");
const sendResponse_1 = require("../../shared/sendResponse");
const httpStatus_1 = require("../../interface/httpStatus");
const fileUploader_1 = require("../../utils/fileUploader");
const createBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    console.log("file", req.file);
    // console.log(req.body);
    if (req === null || req === void 0 ? void 0 : req.file) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-${(_a = req.user) === null || _a === void 0 ? void 0 : _a.email.split("@")[0]}`;
        const path = req.file.buffer;
        const { secure_url } = yield (0, fileUploader_1.sendImageToCloudinary)(imageName, path);
        payload.image = secure_url;
    }
    const result = yield blog_service_1.BlogService.createBlog(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.CREATED,
        message: "Blog created successfully",
        data: result,
    });
}));
const getBlogById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.getBlogById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: "Blog retrieved successfully",
        data: result,
    });
}));
const getAllBlogs = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.getAllBlogs(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: "All blogs retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const updateBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const payload = req.body;
    // Fetch existing blog data
    const existingBlog = yield blog_service_1.BlogService.getBlogById(req.params.id);
    // If a new image is uploaded
    if (req === null || req === void 0 ? void 0 : req.file) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-${(_a = req.user) === null || _a === void 0 ? void 0 : _a.email.split("@")[0]}`;
        const path = (_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer;
        const { secure_url } = yield (0, fileUploader_1.sendImageToCloudinary)(imageName, path);
        payload.image = secure_url;
    }
    else {
        // Reuse existing blog image if no new image uploaded
        payload.image = existingBlog === null || existingBlog === void 0 ? void 0 : existingBlog.image;
    }
    const result = yield blog_service_1.BlogService.updateBlog(req.params.id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: "Blog updated successfully",
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.deleteBlog(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatus_1.httpStatus.OK,
        message: "Blog deleted successfully",
        data: []
    });
}));
exports.BlogController = {
    createBlog,
    getBlogById,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
