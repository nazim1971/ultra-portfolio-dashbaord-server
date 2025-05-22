"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidation = void 0;
const zod_1 = require("zod");
const createMessage = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        subject: zod_1.z.string().min(1, "Subject is required"),
        message: zod_1.z.string().min(1, "Message cannot be empty"),
    }),
});
const updateMessage = zod_1.z.object({
    body: zod_1.z.object({
        viewed: zod_1.z.boolean(),
    }),
});
exports.MessageValidation = {
    createMessage,
    updateMessage,
};
