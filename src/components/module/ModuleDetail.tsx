"use client";

import { useGeneralModal } from "@/hooks/useGeneralModal";
import { useDeleteModule, useGetModuleDetail } from "@/hooks/useModule";
import { Icon, IconName } from "@/icons/HeroIcons";
import { ModalType } from "@/types";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import CardListItem from "../common/CardListItem";
import ComponentCard from "../common/ComponentCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useRouter } from "next/navigation";

interface ModuleDetailProps {
  moduleId: string;
}

export default function ModuleDetail({ moduleId }: ModuleDetailProps) {
  const { open, close } = useGeneralModal();

  // api services

  // -- Get Module Detail
  const { loading, data, error, fetchData } = useGetModuleDetail();

  // -- Delete Module
  const {
    loading: deleteLoading,
    data: deleteData,
    error: deleteError,
    fetchData: deleteFetchData,
  } = useDeleteModule();

  const MODULE_DETAIL = data.data;

  const SelectedIconComponent =
    Icon[(MODULE_DETAIL?.icon as IconName) || "EyeIcon"];

  const router = useRouter();

  useEffect(() => {
    fetchData({ id: moduleId });
  }, []);

  useEffect(() => {
    if (loading || deleteLoading) {
      open(ModalType.LOADING);
    } else {
      close();
    }
  }, [loading, deleteLoading]);

  async function onDeleteModule(customId?: string) {
    await deleteFetchData({ id: customId ? customId : moduleId });

    if (!deleteError) {
      if (!customId) {
        router.back();
      } else {
        fetchData({ id: moduleId });
      }
    }
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Module Detail" />
      <div className="grid grid-cols-6 space-x-4">
        <ComponentCard
          title="Data Module"
          className="col-span-4"
          showActionButton
          actionButtonTitle="Delete Module"
          onActionButtonPress={() => {
            open(ModalType.CONFIRMATION, {
              onConfirm: () => onDeleteModule(),
            });
          }}
        >
          <div>
            <Label>Nama Modul</Label>
            <Input
              placeholder="Nama Modul"
              disabled
              defaultValue={MODULE_DETAIL?.name}
            />
          </div>

          <div>
            <Label>Parent Module</Label>
            <Input
              placeholder="Parent Module"
              disabled
              defaultValue={MODULE_DETAIL?.parentModule?.name ?? "-"}
            />
          </div>

          <div>
            <Label>Path</Label>
            <Input
              placeholder="contoh: '/profile'"
              disabled
              defaultValue={MODULE_DETAIL?.path ?? "-"}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Input
              placeholder="Status"
              disabled
              defaultValue={MODULE_DETAIL?.status}
            />
          </div>

          {!MODULE_DETAIL?.parentModule?.id && (
            <div>
              <Label>Icon</Label>
              {MODULE_DETAIL?.icon && (
                <div className="w-[72px] h-[72px] mb-4 justify-center flex flex-col items-center gap-1 p-2 border hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <SelectedIconComponent className="size-8 text-blue-600" />
                </div>
              )}
            </div>
          )}
        </ComponentCard>

        <ComponentCard title="Submodule List" className="col-span-2">
          {MODULE_DETAIL?.subModules?.length ? (
            <div className="flex flex-col overflow-y-auto space-y-2">
              {MODULE_DETAIL?.subModules.map((item: any, index: number) => {
                return (
                  <CardListItem
                    key={index}
                    title={item?.name}
                    description={item?.path}
                    renderAction={
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          open(ModalType.CONFIRMATION, {
                            onConfirm: () => onDeleteModule(item.id),
                          });
                        }}
                      >
                        <TrashIcon className="size-4 hover:text-red-400" />
                      </div>
                    }
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center text-sm text-gray-400">
              <span>No Data</span>
            </div>
          )}
        </ComponentCard>
      </div>
    </div>
  );
}
