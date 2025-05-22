"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = void 0;
const zod_1 = require("zod");
const createProject = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        liveSiteLink: zod_1.z.string().url(),
        clientCodeLink: zod_1.z.string().url(),
        serverCodeLink: zod_1.z.string().url(),
        images: zod_1.z.array(zod_1.z.string()).optional()
    }),
});
const updateProject = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        liveSiteLink: zod_1.z.string().url().optional(),
        clientCodeLink: zod_1.z.string().url().optional(),
        serverCodeLink: zod_1.z.string().url().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional()
    }),
});
exports.ProjectValidation = {
    createProject,
    updateProject,
};
