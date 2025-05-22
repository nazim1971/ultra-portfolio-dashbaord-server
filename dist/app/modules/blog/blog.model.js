"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    readingTime: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    image: {
        type: String,
        default: null,
    },
}, {
    timestamps: true, // adds createdAt and updatedAt fields automatically
});
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
