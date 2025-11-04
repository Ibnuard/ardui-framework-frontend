"use client";

import { ComponentCard, HeaderActionCard } from "@/components/card";
import Label from "@/components/input/components/Label";
import { Input } from "@/components/input";
import LoadingPage from "@/components/ui/loading/LoadingPage";
import { FieldType } from "@/constants";
import { useSecureNavigation } from "@/context/SecureNavigationContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ModuleAdd() {
  // state handling
  const [loading, setLoading] = useState(true);

  // handle navigation behavior
  const router = useRouter();
  const { params, setParams } = useSecureNavigation();
  const VIEW_PATH = "/module";

  // secured add module
  useEffect(() => {
    if (params?.from != VIEW_PATH) {
      setParams(null);
      router.replace(VIEW_PATH);
    } else {
      setLoading(false);
    }
  }, [params]);

  // handling form
  const methods = useForm({
    defaultValues: {
      "module-name": "",
      "module-label": "",
      "module-parent-id": "",
      "module-icon": "FolderIcon",
      "support-view": false,
      "support-add": false,
      "support-edit": false,
      "support-detail": false,
      "support-approval": false,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  const handleOnGoBack = () => {
    router.back();
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderActionCard
        title="Add Module"
        showSaveButton
        showCancelButton
        onSaveButtonPressed={methods.handleSubmit(onSubmit)}
        onCancelButtonPressed={handleOnGoBack}
      />

      <ComponentCard title="Add New Module">
        <FormProvider {...methods}>
          <Input
            required
            name="module-name"
            label="Module Name"
            type={FieldType.Text}
          />
          <Input
            required
            name="module-label"
            label="Module Label"
            type={FieldType.Text}
          />
          <Input
            name="module-parent-id"
            label="Module Parent"
            type={FieldType.Dropdown}
          />
          <Input
            name="module-icon"
            label="Module Icon"
            type={FieldType.IconPicker}
          />
          <div className="flex flex-col gap-4">
            <Label>Support Page</Label>
            <div className="flex flex-row items-center gap-4 justify-around">
              <Input
                name="support-view"
                label="Support View"
                type={FieldType.Checkbox}
              />
              <Input
                name="support-add"
                label="Support Add"
                type={FieldType.Checkbox}
              />
              <Input
                name="support-edit"
                label="Support Edit"
                type={FieldType.Checkbox}
              />
              <Input
                name="support-detail"
                label="Support Detail"
                type={FieldType.Checkbox}
              />
              <Input
                name="support-approval"
                label="Support Approval"
                type={FieldType.Checkbox}
              />
            </div>
          </div>
        </FormProvider>
      </ComponentCard>
    </div>
  );
}
