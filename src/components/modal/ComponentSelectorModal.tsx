"use client";

import { FieldType } from "@/constants";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ComponentCard } from "../card";
import SearchBar from "../form/SearchBar";
import { Input } from "../input";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface IconSelectorModalProps {
  onSelect: (componentId: string) => void;
  buttonTitle?: string;
}

export default function ComponentSelectorModal({
  onSelect,
  buttonTitle,
}: IconSelectorModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [search, setSearch] = useState("");

  const INPUT_TYPE_LIST = [
    {
      label: "Text Field",
      type: FieldType.Text,
    },
    {
      label: "Text Area Field",
      type: FieldType.TextArea,
    },
    {
      label: "Checkbox Field",
      type: FieldType.Checkbox,
    },
    {
      label: "Switch Field",
      type: FieldType.Switch,
    },
    {
      label: "Radio Field",
      type: FieldType.Radio,
    },
    {
      label: "Dropdown Field",
      type: FieldType.Dropdown,
    },
  ];

  const handleSelect = (componentId: string) => {
    onSelect(componentId);
    closeModal();
  };

  // handling form
  const methods = useForm({
    defaultValues: {
      "module-id": "",
    },
  });

  return (
    <div>
      <Button size="sm" onClick={openModal}>
        {buttonTitle || "Select Component"}
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="w-3xl p-5 lg:p-8">
        <h4 className="font-semibold text-gray-800 mb-5 text-title-sm dark:text-white/90">
          Select Component
        </h4>

        <div className="mb-8">
          <SearchBar
            size="full"
            onSubmit={(keyword: string) => setSearch(keyword)}
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          <FormProvider {...methods}>
            <div className="flex flex-col gap-4">
              {INPUT_TYPE_LIST.map((item, index) => {
                return (
                  <ComponentCard
                    key={index}
                    className="hover:cursor-pointer"
                    size="sm"
                    title={item.label}
                  >
                    <Input disabled name="input-text" type={item.type} />
                  </ComponentCard>
                );
              })}
            </div>
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
}
