import { z } from "zod";

export const moduleCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z0-9 _-]+$/, "Name must not contain special symbols"),
  status: z.enum(["Active", "Inactive"]),
  path: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.startsWith("/"), {
      message: "Path must start with '/'",
    }),
  parentModuleId: z.number().optional(),
  roleIds: z.array(z.number()).optional(),
  icon: z.string().optional(),
});

export const moduleUpdateSchema = moduleCreateSchema.partial();

export type ModuleCreateInput = z.infer<typeof moduleCreateSchema>;
export type ModuleUpdateInput = z.infer<typeof moduleUpdateSchema>;
