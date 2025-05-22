"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoute = void 0;
const express_1 = require("express");
const skill_controller_1 = require("./skill.controller");
const validateRequest_1 = __importDefault(require("../../../middlewires/validateRequest"));
const auth_1 = __importDefault(require("../../../middlewires/auth"));
const user_constant_1 = require("../user/user.constant");
const skill_validation_1 = require("./skill.validation");
exports.SkillRoute = (0, express_1.Router)();
exports.SkillRoute.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(skill_validation_1.SkillValidation.createSkill), skill_controller_1.SkillController.createSkill);
exports.SkillRoute.get('/', skill_controller_1.SkillController.getAllSkills);
exports.SkillRoute.get('/:id', skill_controller_1.SkillController.getSingleSkill);
exports.SkillRoute.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(skill_validation_1.SkillValidation.updateSkill), skill_controller_1.SkillController.updateSkill);
exports.SkillRoute.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), skill_controller_1.SkillController.deleteSkill);
