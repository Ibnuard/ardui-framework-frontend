"use client";

import {
  CardMenuItem,
  ComponentCard,
  HeaderActionCard,
} from "@/components/card";
import { Input } from "@/components/input";
import { FieldType } from "@/constants";
import { FormProvider, useForm } from "react-hook-form";

export default function MenuManagement() {
  const methods = useForm({});
  const SAMPLE_SUBMENU = [{ title: "View" }, { title: "Approval" }];

  return (
    <div className="flex flex-col h-[calc(100vh-132px)] gap-4 overflow-hidden">
      <HeaderActionCard title="Menu Management" showSaveButton />

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
        {/* Kiri */}
        <ComponentCard
          className="flex flex-col h-full min-h-0"
          title="Current Menu"
        >
          <div className="flex-1 min-h-0 overflow-auto p-2 flex flex-col gap-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardMenuItem
                key={i}
                title={`Documents ${i + 1}`}
                showIcon
                subMenuList={SAMPLE_SUBMENU}
              />
            ))}
          </div>
        </ComponentCard>

        {/* Kanan */}
        <ComponentCard
          className="flex flex-col h-full min-h-0"
          title="Menu Detail"
        >
          <div className="flex flex-col gap-4">
            <FormProvider {...methods}>
              <Input
                name="module-label"
                label="Module Label"
                type={FieldType.Text}
              />
            </FormProvider>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
