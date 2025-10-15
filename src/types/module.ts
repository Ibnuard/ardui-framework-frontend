export type TRole = {
  id: number;
  name: string;
  status: string;
  createdDate: string | null; // string karena sudah di-serialize
};

export type TModuleRole = {
  id: number;
  moduleId: number;
  roleId: number;
  role: TRole;
};

export type TModule = {
  id: number;
  name: string;
  status: string;
  createdDate: string | null; // juga string
  roles: TModuleRole[];
};

export type TModulePaginationResponse =
  | {
      data: TModule[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      error: null;
    }
  | {
      data: TModule[];
      pagination: null;
      error: string;
    };
