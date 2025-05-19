import { z } from "zod";

const createUser = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "USER"]),
    status: z.enum(["ACTIVE", "BLOCKED"]),
    name: z.string().min(1),
    profilePhoto: z.string().url().optional(),
    contactNumber: z.string().optional(),
    isDeleted: z.boolean().default(false),
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
