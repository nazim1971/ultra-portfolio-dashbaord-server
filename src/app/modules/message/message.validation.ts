import { z } from 'zod';

const createMessage = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message cannot be empty"),
  }),
});



const updateMessage = z.object({
  body: z.object({
    viewed: z.boolean(),
  }),
});

export const MessageValidation = {
  createMessage,
  updateMessage,
};
