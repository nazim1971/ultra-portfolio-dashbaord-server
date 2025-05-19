import { z } from "zod";

const createUser = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    profilePhoto: z.string().url().optional(),
    contactNumber: z.string().optional(),
  }),
});

const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "BLOCKED"]),
  }),
});

export const UserValidation = {
  createUser,
  updateUserStatusSchema,
};
