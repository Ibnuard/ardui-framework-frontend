import prisma from "@/lib/prisma";
import { moduleCreateSchema } from "@/schemas/moduleSchema";
import { ZodError } from "zod";

export async function updateModule(id: number, data: unknown) {
  try {
    // Validasi data sebelum update
    const validated = moduleCreateSchema.parse(data);

    // Update Module
    const updated = await prisma.module.update({
      where: { id },
      data: {
        name: validated.name,
        status: validated.status,
        path: validated.path ?? undefined,
        parentModuleId: validated.parentModuleId ?? undefined,
        icon: validated.icon ?? undefined,
        roles: validated.roleIds
          ? {
              set: [], // clear previous
              create: validated.roleIds.map((roleId) => ({
                role: { connect: { id: roleId } },
              })),
            }
          : undefined,
      },
    });

    // Mengosongkan path parent jika diberi parentId
    if (validated.parentModuleId) {
      await prisma.module.update({
        where: { id: validated.parentModuleId },
        data: { path: null },
      });
    }

    return { success: true, data: updated };
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        success: false,
        error: "Validation failed",
        issues: err.errors,
      };
    }

    return {
      success: false,
      error: "Internal server error",
    };
  }
}
