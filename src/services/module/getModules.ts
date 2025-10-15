import prisma from "@/lib/prisma";

type GetParams = {
  page?: number;
  limit?: number;
};

export async function getModules({
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
            { name: { contains: keyword } },
            { path: { contains: keyword } },
          ],
        }
      : undefined;

    const [modules, total] = await Promise.all([
      prisma.module.findMany({
        skip,
        take: limit,
        where: searchCondition,
        orderBy: {
          createdDate: "desc",
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
          parentModule: true,
          subModules: true,
        },
      }),
      prisma.module.count({
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
    console.error("Error fetching modules:", error);
    return {
      data: [],
      pagination: null,
      error: "Failed to fetch modules",
    };
  }
}

export async function getParentModule({
  page = 1,
  limit = 200,
}: GetParams = {}) {
  try {
    const skip = (page - 1) * limit;

    const [modules, total] = await Promise.all([
      prisma.module.findMany({
        skip,
        take: limit,
        orderBy: {
          createdDate: "desc",
        },
        where: {
          parentModuleId: null,
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
          parentModule: true,
          subModules: true,
        },
      }),
      prisma.module.count({
        where: {
          OR: [
            { parentModuleId: null },
            {
              parentModuleId: { not: null },
              subModules: { none: {} },
            },
          ],
        },
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
    console.error("Error fetching modules:", error);
    return {
      data: [],
      pagination: null,
      error: "Failed to fetch modules",
    };
  }
}

export async function getModuleDetail(id: number) {
  try {
    const module = await prisma.module.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        parentModule: true,
        subModules: true,
      },
    });

    if (!module) {
      return {
        data: null,
        error: "Module not found",
      };
    }

    return {
      data: module,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching module detail:", error);
    return {
      data: null,
      error: "Failed to fetch module detail",
    };
  }
}
