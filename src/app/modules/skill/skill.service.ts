
import QueryBuilder from '../../builder/queryBuilder';
import { ensureExists } from '../../utils/isExist';
import { TSkill } from './skill.interface';
import { Skill } from './skill.model';

const createSkill = async (payload: TSkill) => {
  return await Skill.create(payload);
};

const getAllSkills = async (query: Record<string, unknown>) => {
  const skillQuery = Skill.find(); // base query

  const queryBuilder = new QueryBuilder<TSkill>(skillQuery, query)
    .search(['name']) // replace with actual searchable fields in your Skill model
    .filter()
    .sort()
    .paginate()
    .fields();

  const skills = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    data: skills,
  };
};


const getSingleSkill = async (id: string) => {
  const skill =  await Skill.findById(id);
  ensureExists(skill, "Skill not found!");
    return skill;
};

const updateSkill = async (id: string, payload: Partial<TSkill>) => {
  const skill =  await Skill.findByIdAndUpdate(id, payload, { new: true });
   ensureExists(skill, "Skill not found!");
    return skill;
};

const deleteSkill = async (id: string) => {
  const skill = await Skill.findByIdAndDelete(id);
  ensureExists(skill, "Skill not found!");
  return Skill;
};

export const SkillService = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
