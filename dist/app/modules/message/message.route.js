"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoute = void 0;
const express_1 = require("express");
const message_controller_1 = require("./message.controller");
const validateRequest_1 = __importDefault(require("../../../middlewires/validateRequest"));
const auth_1 = __importDefault(require("../../../middlewires/auth"));
const user_constant_1 = require("../user/user.constant");
const message_validation_1 = require("./message.validation");
exports.MessageRoute = (0, express_1.Router)();
// Public route: anyone can send a message
exports.MessageRoute.post('/', (0, validateRequest_1.default)(message_validation_1.MessageValidation.createMessage), message_controller_1.MessageController.createMessage);
// Only ADMIN or USER can view messages
exports.MessageRoute.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), message_controller_1.MessageController.getAllMessages);
exports.MessageRoute.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), message_controller_1.MessageController.getSingleMessage);
// Only viewed field should be updated
exports.MessageRoute.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), message_controller_1.MessageController.updateMessage);
// Only ADMIN or USER can delete a message
exports.MessageRoute.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), message_controller_1.MessageController.deleteMessage);
