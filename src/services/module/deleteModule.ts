import prisma from "@/lib/prisma";

export async function deleteModule(id: number) {
  return prisma.module.delete({
    where: { id },
  });
}
