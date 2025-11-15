"use client";

import { ComponentCard, HeaderActionCard } from "@/components/card";
import Label from "@/components/input/components/Label";
import { Input } from "@/components/input";
import ComponentSelectorModal from "@/components/modal/ComponentSelectorModal";
import LoadingPage from "@/components/ui/loading/LoadingPage";
import { FieldType } from "@/constants";
import { useSecureNavigation } from "@/context/SecureNavigationContext";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Option } from "@/components/input/components/CustomSelect";

interface ComponentProps {
  type: FieldType;
  label: string;
  optionList: Option[];
  id: number;
  required: boolean;
}

export default function LayoutBuilderAdd() {
  // state handling
  const [loading, setLoading] = useState(true);
  const [inputConfig, setInputConfig] = useState<ComponentProps[]>([]);

  // handle navigation behavior
  const router = useRouter();
  const { params, setParams } = useSecureNavigation();
  const VIEW_PATH = "/layout-builder";

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
  const methods = useForm({});

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  const handleOnGoBack = () => {
    router.back();
  };

  if (loading) {
    return <LoadingPage />;
  }

  function handleOnSelected(componentType: FieldType) {
    setInputConfig((prev: ComponentProps[]) => [
      ...prev,
      {
        type: componentType,
        label: "Test",
        optionList: [{ label: "Test", value: "value" }],
        id: prev.length + 1,
        required: false,
      },
    ]);
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderActionCard
        title="Add Layout Builder"
        showSaveButton
        showCancelButton
        onSaveButtonPressed={methods.handleSubmit(onSubmit)}
        onCancelButtonPressed={handleOnGoBack}
      />

      <ComponentCard title="Add New Module">
        <FormProvider {...methods}>
          <Input name="module-id" label="Module" type={FieldType.Dropdown} />
        </FormProvider>
      </ComponentCard>

      <ComponentCard
        title="Build Layout"
        showActionButton
        customActionButton={
          <ComponentSelectorModal
            buttonTitle="Add Component"
            onSelect={handleOnSelected}
          />
        }
      >
        {inputConfig.length > 0 ? (
          <FormProvider {...methods}>
            {inputConfig.map((item, index) => (
              <div className="p-2.5 border-2 rounded-lg hover:bg-gray-50 hover:cursor-pointer">
                <Input
                  key={index}
                  disabled
                  optionList={item.optionList}
                  name="input-text"
                  type={item.type}
                />
              </div>
            ))}
          </FormProvider>
        ) : (
          <p className="text-center text-gray-500 py-8">No component</p>
        )}
      </ComponentCard>
    </div>
  );
}
