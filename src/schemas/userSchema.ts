import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  userToken: z.string().optional(),
  roleId: z.number().int().positive().optional(),
});

// Schema for update (make everything optional)
export const updateUserSchema = createUserSchema.partial();

export const userIdSchema = z.object({ id: z.number().int().positive() });

export const User = z.object({
  id: z.number().int().positive(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  userToken: z.string().optional(),
  roleId: z.number().int().positive().optional(),
  createdAt: z.date(),
});

// An array of users
export const UserArray = z.array(User);
