import QueryBuilder from '../../builder/queryBuilder';
import { ensureExists } from '../../utils/isExist';
import { TProject } from './project.interface';
import Project from './project.model';

const createProject = async (payload: TProject) => {
  const project = await Project.create(payload);
  return project;
};

const getProjectById = async (id: string) => {
  const project = await Project.findById(id);
   ensureExists(project, "Project not found!");

   return project
};

const getAllProjects = async (query: Record<string, unknown>) => {
  const projectQuery = Project.find(); // base query

  const queryBuilder = new QueryBuilder<TProject>(projectQuery, query)
    .search(['title', 'description']) // Add searchable fields
    .filter()
    .sort()
    .paginate()
    .fields();

  const projects = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    data: projects,
  };
};


const updateProject = async (id: string, payload: Partial<TProject>) => {
  return await Project.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProject = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);
  ensureExists(project, "Project not found!");

  return Project;
};

export const ProjectService = {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
};
