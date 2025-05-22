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
exports.MessageService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const isExist_1 = require("../../utils/isExist");
const message_model_1 = __importDefault(require("./message.model"));
const createMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.default.create(payload);
    return message;
});
const getMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.default.findById(id);
    (0, isExist_1.ensureExists)(message, "Message not found!");
    return message;
});
const getAllMessages = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const messageQuery = message_model_1.default.find();
    const queryBuilder = new queryBuilder_1.default(messageQuery, query)
        .search(['name', 'email', 'subject', 'message'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const messages = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return {
        meta,
        data: messages,
    };
});
const updateMessage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    (0, isExist_1.ensureExists)(message, "Message not found!");
    return message;
});
const deleteMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.default.findByIdAndDelete(id);
    (0, isExist_1.ensureExists)(message, "Message not found!");
    return message;
});
exports.MessageService = {
    createMessage,
    getMessageById,
    getAllMessages,
    updateMessage,
    deleteMessage,
};
