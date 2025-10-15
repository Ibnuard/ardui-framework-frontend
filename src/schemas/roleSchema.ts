// src/schemas/moduleSchema.ts
import { z } from "zod";

export const roleCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["Active", "Inactive"]),
});

export const roleUpdateSchema = roleCreateSchema.partial(); // semua opsional

export type RoleCreateInput = z.infer<typeof roleCreateSchema>;
export type RoleUpdateInput = z.infer<typeof roleUpdateSchema>;
