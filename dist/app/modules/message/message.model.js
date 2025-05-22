"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    viewed: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Message = (0, mongoose_1.model)('Message', messageSchema);
exports.default = Message;
