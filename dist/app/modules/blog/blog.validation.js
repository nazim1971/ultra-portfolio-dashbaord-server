"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = exports.updateBlog = exports.createBlog = void 0;
const zod_1 = require("zod");
exports.createBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5, "Title must be at least 5 characters"),
        description: zod_1.z.string().min(20, "Description must be at least 20 characters"),
        content: zod_1.z.string().min(50, "Content must be at least 50 characters"),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        readingTime: zod_1.z.string().min(2, "Reading time is required"),
        slug: zod_1.z.string().min(3, "Slug must be at least 3 characters").optional(),
        image: zod_1.z.string().optional(),
    })
});
exports.updateBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5).optional(),
        description: zod_1.z.string().min(20).optional(),
        content: zod_1.z.string().min(50).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        readingTime: zod_1.z.string().min(2).optional(),
        slug: zod_1.z.string().min(3).optional(),
        image: zod_1.z.string().optional(),
    })
});
exports.BlogValidation = {
    createBlog: exports.createBlog,
    updateBlog: exports.updateBlog,
};
