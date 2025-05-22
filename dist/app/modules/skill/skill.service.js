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
exports.SkillService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const isExist_1 = require("../../utils/isExist");
const skill_model_1 = require("./skill.model");
const createSkill = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield skill_model_1.Skill.create(payload);
});
const getAllSkills = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const skillQuery = skill_model_1.Skill.find(); // base query
    const queryBuilder = new queryBuilder_1.default(skillQuery, query)
        .search(['name']) // replace with actual searchable fields in your Skill model
        .filter()
        .sort()
        .paginate()
        .fields();
    const skills = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return {
        meta,
        data: skills,
    };
});
const getSingleSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.findById(id);
    (0, isExist_1.ensureExists)(skill, "Skill not found!");
    return skill;
});
const updateSkill = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.findByIdAndUpdate(id, payload, { new: true });
    (0, isExist_1.ensureExists)(skill, "Skill not found!");
    return skill;
});
const deleteSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.findByIdAndDelete(id);
    (0, isExist_1.ensureExists)(skill, "Skill not found!");
    return skill_model_1.Skill;
});
exports.SkillService = {
    createSkill,
    getAllSkills,
    getSingleSkill,
    updateSkill,
    deleteSkill,
};
