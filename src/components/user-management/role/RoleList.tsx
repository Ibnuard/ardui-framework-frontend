"use client";

import ComponentCard from "@/components/common/ComponentCard";
import DataTable from "@/components/common/DataTable";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddRoleModal from "@/components/modal/AddRoleModal";
import { useModal } from "@/hooks/useModal";
import { useGetRole } from "@/hooks/useRole";
import { ModalType } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";

type Module = {
  name: string;
  status: string;
  createdDate: string;
};

const columnHelper = createColumnHelper<Module>();

const columns = [
  columnHelper.accessor("name", {
    header: "Role Name",
    cell: (info) => info.getValue(),
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <button
        onClick={() => alert(`Detail for ${row.original.name}`)}
        className="text-sm text-blue-600 hover:underline"
      >
        Detail
      </button>
    ),
  }),
];

export default function RoleList() {
  // data state
  const { loading, data, error, fetchData } = useGetRole();
  const listData = data.data || [];
  const paginationData = data.pagination;

  // modal state
  const { isOpen, openModal, closeModal, type, setType } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Role List" />
      <div className="space-y-6">
        <ComponentCard
          showSearchbar
          showActionButton
          title="Role List"
          actionButtonTitle="Buat Role"
          onSearch={(keyword) => {
            console.log("KEY", keyword);
          }}
          onActionButtonPress={() => {
            setType(ModalType.ADD_ROLE);
            openModal();
          }}
        >
          <DataTable
            data={listData}
            columns={columns}
            loading={loading}
            totalPage={paginationData?.totalPages}
          />
        </ComponentCard>
      </div>
      <AddRoleModal
        visible={isOpen}
        toggle={closeModal}
        saveResult={(result) => {
          if (result == "SUCCESS") {
            fetchData();
          }
        }}
      />
    </div>
  );
}
