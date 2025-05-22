"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    liveSiteLink: { type: String, required: true },
    clientCodeLink: { type: String, required: true },
    serverCodeLink: { type: String, required: true },
    images: { type: [String], default: [] },
}, {
    timestamps: true,
});
const Project = (0, mongoose_1.model)('Project', projectSchema);
exports.default = Project;
