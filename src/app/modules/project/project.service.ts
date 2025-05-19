import { TProject } from './project.interface';
import Project from './project.model';

const createProject = async (payload: TProject) => {
  const project = await Project.create(payload);
  return project;
};

const getProjectById = async (id: string) => {
  return await Project.findById(id);
};

const getAllProjects = async () => {
  return await Project.find();
};

const updateProject = async (id: string, payload: Partial<TProject>) => {
  return await Project.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProject = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};

export const ProjectService = {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
};
