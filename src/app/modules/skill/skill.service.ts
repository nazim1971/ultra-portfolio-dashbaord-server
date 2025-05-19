
import { TSkill } from './skill.interface';
import { Skill } from './skill.model';

const createSkill = async (payload: TSkill) => {
  return await Skill.create(payload);
};

const getAllSkills = async () => {
  return await Skill.find();
};

const getSingleSkill = async (id: string) => {
  return await Skill.findById(id);
};

const updateSkill = async (id: string, payload: Partial<TSkill>) => {
  return await Skill.findByIdAndUpdate(id, payload, { new: true });
};

const deleteSkill = async (id: string) => {
  return await Skill.findByIdAndDelete(id);
};

export const SkillService = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
