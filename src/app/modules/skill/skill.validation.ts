import { z } from 'zod';


 const createSkill = z.object({
    body: z.object({
      name: z.string({ required_error: 'Skill name is required' }),
      image: z.string({ required_error: 'Skill image URL is required' }).url('Must be a valid URL'),
    }),
  })

 const updateSkill = z.object({
    body: z.object({
      name: z.string().optional(),
      image: z.string().url('Must be a valid URL').optional(),
    }),
  })


export const SkillValidation = {
updateSkill,
createSkill
}