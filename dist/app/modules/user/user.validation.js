"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        name: zod_1.z.string().min(1),
        profilePhoto: zod_1.z.string().url().optional(),
        contactNumber: zod_1.z.string().optional(),
    }),
});
const updateUserStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["ACTIVE", "BLOCKED"]),
    }),
});
exports.UserValidation = {
    createUser,
    updateUserStatusSchema,
};
