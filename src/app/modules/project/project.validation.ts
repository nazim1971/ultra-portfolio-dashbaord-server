import { z } from 'zod';

const createProject = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    liveSiteLink: z.string().url(),
    clientCodeLink: z.string().url(),
    serverCodeLink: z.string().url(),
    images: z.array(z.string()).optional()
  }),
});

const updateProject = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    liveSiteLink: z.string().url().optional(),
    clientCodeLink: z.string().url().optional(),
    serverCodeLink: z.string().url().optional(),
    images: z.array(z.string()).optional()
  }),
});

export const ProjectValidation = {
  createProject,
  updateProject,
};
