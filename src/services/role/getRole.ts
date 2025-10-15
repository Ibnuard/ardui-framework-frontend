import prisma from "@/lib/prisma";

type GetParams = {
  page?: number;
  limit?: number;
};

export async function getRoles({
  page = 1,
  limit = 10,
  search = "",
}: GetParams & { search?: string } = {}) {
  try {
    const skip = (page - 1) * limit;
    const keyword = search.trim();

    const searchCondition = keyword
      ? {
          OR: [{ name: { contains: keyword } }],
        }
      : undefined;

    const [modules, total] = await Promise.all([
      prisma.role.findMany({
        skip,
        take: limit,
        orderBy: {
          createdDate: "desc",
        },
        where: searchCondition,
      }),
      prisma.role.count({
        where: searchCondition,
      }),
    ]);

    return {
      data: modules,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return {
      data: [],
      pagination: null,
      error: "Failed to fetch roles",
    };
  }
}
