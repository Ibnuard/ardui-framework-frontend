"use client";

import { ComponentCard } from "@/components/card";
import DataTable from "@/components/common/DataTable";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useSecureNavigation } from "@/context/SecureNavigationContext";
import { secureNavigate } from "@/utils/NavigationUtils";
import { DocumentTextIcon, PencilIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Module = {
  id: number;
  name: string;
  status: string;
  createdDate: string;
  parentModule: any;
  path: string;
};

const columnHelper = createColumnHelper<Module>();

const columns = [
  columnHelper.accessor("name", {
    header: "Module Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("parentModule", {
    header: "Type",
    cell: (info) => {
      const parentModule = info.getValue();
      return parentModule ? "Sub Module" : "Main Module";
    },
  }),
  columnHelper.accessor("path", {
    header: "Path",
    cell: (info) => info.getValue() ?? "-",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdDate", {
    header: "Created Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;

      return (
        <div className="z-10 flex items-center space-x-4 px-4">
          <button onClick={() => router.push(`/edit/${id}`)}>
            <PencilIcon className="size-4 text-gray-400 hover:text-blue-700" />
          </button>
          <button onClick={() => router.push(`/detail/${id}`)}>
            <DocumentTextIcon className="size-4 text-gray-400 hover:text-red-700" />
          </button>
        </div>
      );
    },
  }),
];

export default function LayoutBuilderView() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const VIEW_PATH = "layout-builder";

  const router = useRouter();
  const pathname = usePathname();
  const { setParams } = useSecureNavigation();

  //   useEffect(() => {
  //     fetchData({ page: page, limit: 5, search: search });
  //   }, [page, search]);

  //   function handleOnNext() {
  //     if (page < paginationData?.totalPages) {
  //       setPage(page + 1);
  //     }
  //   }

  function handleOnPrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Layout Builder" />
      <div className="space-y-6">
        <ComponentCard
          showSearchbar
          showActionButton
          title="Layout List"
          actionButtonTitle="Add"
          onSearch={(keyword) => {
            setPage(1);
            setSearch(keyword);
          }}
          onActionButtonPress={() =>
            secureNavigate(router, `${VIEW_PATH}/add`, pathname, setParams)
          }
        >
          <DataTable
            data={[]}
            columns={columns}
            loading={false}
            totalPage={0}
            onNext={() => {}}
            onPrev={handleOnPrev}
            page={page}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
