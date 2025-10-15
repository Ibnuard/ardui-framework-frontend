import prisma from "@/lib/prisma";
import { moduleCreateSchema } from "@/schemas/moduleSchema";
import { ZodError } from "zod";

export async function createModule(data: unknown) {
  try {
    const validated = moduleCreateSchema.parse(data);

    const created = await prisma.module.create({
      data: {
        name: validated.name,
        status: validated.status,
        path: validated.path ?? undefined,
        parentModuleId: validated.parentModuleId ?? undefined,
        roles: validated.roleIds
          ? {
              create: validated.roleIds.map((id) => ({
                role: { connect: { id } },
              })),
            }
          : undefined,
        icon: validated.icon ?? undefined,
      },
    });

    // remove parent path if exist
    if (validated.parentModuleId != null) {
      await prisma.module.update({
        data: {
          path: null,
        },
        where: {
          id: validated.parentModuleId,
        },
      });
    }

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
