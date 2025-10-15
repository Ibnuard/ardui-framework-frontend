// src/services/module/createModule.ts
import prisma from "@/lib/prisma";
import { roleCreateSchema } from "@/schemas/roleSchema";
import { ZodError } from "zod";

export async function createRole(data: unknown) {
  try {
    const validated = roleCreateSchema.parse(data);

    const created = await prisma.role.create({
      data: {
        name: validated.name,
        status: validated.status,
      },
    });

    return { success: true, data: created };
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        success: false,
        error: "Validation failed",
        issues: err.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      error: "Internal server error",
    };
  }
}
