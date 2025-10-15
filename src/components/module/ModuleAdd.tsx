"use client";

import {
  useAddModule,
  useEditModule,
  useGetModuleDetail,
  useGetParentModule,
} from "@/hooks/useModule";
import ComponentCard from "../common/ComponentCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Label from "../form/Label";
import Select from "../form/Select";
import Input from "../form/input/InputField";
import { useEffect, useState } from "react";
import IconSelectorModal from "../modal/IconSelectorModal";
import { Icon, IconName } from "@/icons/HeroIcons";
import { ModuleCreateInput, moduleCreateSchema } from "@/schemas/moduleSchema";
import { useGeneralModal } from "@/hooks/useGeneralModal";
import { ModalType } from "@/types";
import { useRouter } from "next/navigation";
import CustomSelect from "../form/CustomSelect";

interface Option {
  value: string;
  label: string;
}

const statusValue = [
  {
    label: "Aktif",
    value: "Active",
  },
  {
    label: "Tidak aktif",
    value: "Inactive",
  },
];

interface ModuleEditProps {
  moduleId?: string;
}

export default function ModuleAdd({ moduleId }: ModuleEditProps) {
  // api services

  // -- Get Parent Module List
  const {
    loading: loadingParent,
    data: dataParent,
    fetchData: fetchParent,
  } = useGetParentModule();

  // -- Add New Module
  const {
    loading: loadingAdd,
    error: errorAdd,
    fetchData: fetchAdd,
  } = useAddModule();

  // -- Edit New Module
  const {
    loading: loadingEdit,
    error: errorEdit,
    fetchData: fetchEdit,
  } = useEditModule();

  // -- Get Module Detail
  const {
    loading: loadingDetail,
    data: dataDetail,
    error: errorDetail,
    fetchData: fetchDetail,
  } = useGetModuleDetail();

  // STATE
  const [name, setName] = useState<string>("");
  const [path, setPath] = useState<string | null>();
  const [parentId, setParentId] = useState<string>();
  const [status, setStatus] = useState<string | null>();
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>();
  const [errors, setErrors] = useState<
    Partial<Record<keyof ModuleCreateInput, string>>
  >({});
  const { open, close } = useGeneralModal();

  const disabledBySubmodule = parentId != null && !path;

  const router = useRouter();

  const IS_EDIT_MODE = moduleId != null;
  const DETAIL_DATA = dataDetail?.data;

  const SelectedIconComponent =
    Icon[selectedIcon || (DETAIL_DATA?.icon as IconName) || "EyeIcon"];

  async function onAddModule() {
    const payload = {
      name,
      path: path || undefined,
      parentModuleId: Number(parentId) || undefined,
      status: status || "",
      icon: selectedIcon || undefined,
    };

    const result = moduleCreateSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        path: fieldErrors.path?.[0],
        parentModuleId: fieldErrors.parentModuleId?.[0],
        status: fieldErrors.status?.[0],
      });
      return;
    }

    setErrors({});
    await fetchAdd(payload);

    if (!errorAdd) {
      router.back();
    }
  }

  async function onEditModule() {
    const payload = {
      name,
      path: path || undefined,
      parentModuleId: Number(parentId) || undefined,
      status: status || "",
      icon: selectedIcon || undefined,
    };

    const result = moduleCreateSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        path: fieldErrors.path?.[0],
        parentModuleId: fieldErrors.parentModuleId?.[0],
        status: fieldErrors.status?.[0],
      });
      return;
    }

    setErrors({});
    await fetchEdit({ id: moduleId!, data: payload });

    if (!errorEdit) {
      fetchDetail({ id: moduleId! });
    }
  }

  useEffect(() => {
    fetchParent();
  }, []);

  useEffect(() => {
    if (moduleId != null) {
      fetchDetail({ id: moduleId });
    }
  }, [moduleId]);

  useEffect(() => {
    if (loadingAdd || loadingParent || loadingDetail || loadingEdit) {
      open(ModalType.LOADING);
    } else {
      close();
    }
  }, [loadingAdd, loadingParent, loadingDetail, loadingEdit]);

  useEffect(() => {
    if (dataDetail) {
      const DETAIL = dataDetail.data;

      setName(DETAIL?.name);
      setParentId(DETAIL?.parentModule?.id);
      setPath(DETAIL?.path);
      setStatus(DETAIL?.status);
      setSelectedIcon(DETAIL?.icon);
    }
  }, [dataDetail]);

  function mappingParent() {
    if (!dataParent) return [];

    const data = dataParent?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));

    return data;
  }

  const parentList: Option[] = mappingParent() || [];

  return (
    <div>
      <PageBreadcrumb
        pageTitle={IS_EDIT_MODE ? "Edit Module" : "Buat Module"}
      />
      <ComponentCard
        showActionButton
        actionButtonTitle="Simpan"
        title="Data Module"
        onActionButtonPress={() => {
          open(ModalType.CONFIRMATION, {
            onConfirm: () => (IS_EDIT_MODE ? onEditModule() : onAddModule()),
          });
        }}
        actionButtonDisabled={
          !name ||
          !status ||
          (!parentId && !selectedIcon) ||
          disabledBySubmodule
        }
      >
        <div>
          <Label required>Nama Modul</Label>
          <Input
            placeholder="Nama Modul"
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            hint={errors.name}
            defaultValue={DETAIL_DATA?.name}
          />
        </div>

        <div>
          <Label>Parent Module</Label>
          <CustomSelect
            options={parentList}
            placeholder="Parent Module"
            onChange={(value) => setParentId(value)}
            value={parentId}
            error={!!errors.parentModuleId}
            hint={errors.parentModuleId}
          />
        </div>

        <div>
          <Label required={parentId != null}>Path</Label>
          <Input
            placeholder="contoh: '/profile'"
            onChange={(e) => setPath(e.target.value)}
            error={!!errors.path}
            hint={errors.path}
            defaultValue={DETAIL_DATA?.path}
          />
        </div>

        <div>
          <Label required>Status</Label>
          <Select
            options={statusValue}
            placeholder="Status"
            onChange={(value) => setStatus(value)}
            error={!!errors.status}
            hint={errors.status}
            defaultValue={DETAIL_DATA?.status}
          />
        </div>

        {!parentId && !DETAIL_DATA?.parentModule?.id && (
          <div>
            <Label>Icon</Label>
            {(selectedIcon || DETAIL_DATA?.icon) && (
              <div className="w-[72px] h-[72px] mb-4 justify-center flex flex-col items-center gap-1 p-2 border hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <SelectedIconComponent className="size-8 text-blue-600" />
              </div>
            )}

            <IconSelectorModal
              selected={selectedIcon || DETAIL_DATA?.icon}
              onSelect={setSelectedIcon}
            />
          </div>
        )}
      </ComponentCard>
    </div>
  );
}
