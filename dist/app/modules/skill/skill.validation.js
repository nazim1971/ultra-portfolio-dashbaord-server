"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillValidation = void 0;
const zod_1 = require("zod");
const createSkill = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Skill name is required' }),
        image: zod_1.z.string({ required_error: 'Skill image URL is required' }).url('Must be a valid URL'),
    }),
});
const updateSkill = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().url('Must be a valid URL').optional(),
    }),
});
exports.SkillValidation = {
    updateSkill,
    createSkill
};
