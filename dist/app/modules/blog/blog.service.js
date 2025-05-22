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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const isExist_1 = require("../../utils/isExist");
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.create(payload);
    return blog;
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id);
    (0, isExist_1.ensureExists)(blog, "Blog not found!");
    return blog;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogsQuery = blog_model_1.default.find(); // Start with a blank query
    const queryBuilder = new queryBuilder_1.default(blogsQuery, query)
        .search(['title', 'description', 'content', 'tags']) // searchable fields
        .filter()
        .sort()
        .paginate()
        .fields();
    const blogs = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return {
        meta,
        data: blogs,
    };
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return updatedBlog;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield blog_model_1.default.findByIdAndDelete(id);
    (0, isExist_1.ensureExists)(deleted, "Blog not found!");
    return deleted;
});
exports.BlogService = {
    createBlog,
    getBlogById,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
