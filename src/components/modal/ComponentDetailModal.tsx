"use client";

import { FieldType } from "@/constants";
import { useModal } from "@/hooks/useModal";
import { useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ComponentCard } from "../card";
import SearchBar from "../input/components/SearchBar";
import { Input } from "../input";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface ModalProps {
  onSelect: (componentId: FieldType) => void;
  buttonTitle?: string;
}

export default function ComponentSelectorModal({
  onSelect,
  buttonTitle,
}: ModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [search, setSearch] = useState("");

  const INPUT_TYPE_LIST = [
    { label: "Text Field", type: FieldType.Text, optionList: [] },
    { label: "Text Area Field", type: FieldType.TextArea, optionList: [] },
    { label: "Checkbox Field", type: FieldType.Checkbox, optionList: [] },
    { label: "Switch Field", type: FieldType.Switch, optionList: [] },
    {
      label: "Radio Field",
      type: FieldType.Radio,
      optionList: [{ label: "Sample", value: "0" }],
    },
    { label: "Dropdown Field", type: FieldType.Dropdown, optionList: [] },
    { label: "Date Picker Field", type: FieldType.DatePicker, optionList: [] },
    { label: "Time Picker Field", type: FieldType.TimePicker, optionList: [] },
    { label: "File Picker Field", type: FieldType.File, optionList: [] },
  ];

  const handleSelect = (componentId: FieldType) => {
    onSelect(componentId);
    closeModal();
  };

  // Filter input list based on search term
  const filteredList = useMemo(() => {
    if (!search.trim()) return INPUT_TYPE_LIST;
    const keyword = search.toLowerCase();
    return INPUT_TYPE_LIST.filter((item) =>
      item.label.toLowerCase().includes(keyword)
    );
  }, [search]);

  // handling form
  const methods = useForm({
    defaultValues: { "module-id": "" },
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

        {/* 🔍 Search input */}
        <div className="mb-8">
          <SearchBar
            size="full"
            onSubmit={(keyword: string) => setSearch(keyword)}
          />
        </div>

        {/* 📋 Component list */}
        <div className="max-h-[400px] overflow-y-auto">
          <FormProvider {...methods}>
            {filteredList.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredList.map((item, index) => (
                  <div key={index} onClick={() => handleSelect(item.type)}>
                    <ComponentCard
                      className="hover:cursor-pointer hover:bg-gray-50"
                      size="sm"
                      title={item.label}
                    >
                      <Input
                        disabled
                        optionList={item.optionList}
                        name="input-text"
                        type={item.type}
                      />
                    </ComponentCard>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No results found for "
                <span className="font-medium">{search}</span>"
              </p>
            )}
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
}
