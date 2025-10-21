"use client";

import { ComponentCard, HeaderActionCard } from "@/components/card";
import { Input } from "@/components/input";
import { FieldType } from "@/constants";
import { FormProvider, useForm } from "react-hook-form";

export default function ModuleAdd() {
  const methods = useForm({
    defaultValues: {
      "module-name": "",
      "module-label": "",
      "module-parent-id": "",
      "module-icon": "FolderIcon",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex flex-col gap-4">
      <HeaderActionCard
        title="Add Module"
        showSaveButton
        showCancelButton
        onSaveButtonPressed={methods.handleSubmit(onSubmit)}
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
        </FormProvider>
      </ComponentCard>
    </div>
  );
}
