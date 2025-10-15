import prisma from "@/lib/prisma";

type GetParams = {
  page?: number;
  limit?: number;
};

export async function getUsers({
  page = 1,
  limit = 10,
  search = "",
}: GetParams & { search?: string } = {}) {
  try {
    const skip = (page - 1) * limit;
    const keyword = search.trim();

    const searchCondition = keyword
      ? {
          OR: [
            { username: { contains: keyword } },
            { email: { contains: keyword } },
          ],
        }
      : undefined;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        where: searchCondition,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          role: true,
        },
      }),
      prisma.user.count({
        where: searchCondition,
      }),
    ]);

    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      data: [],
      pagination: null,
      error: "Failed to fetch users",
    };
  }
}
