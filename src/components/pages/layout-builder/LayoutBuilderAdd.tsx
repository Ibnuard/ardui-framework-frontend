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

export default function LayoutBuilderAdd() {
  // state handling
  const [loading, setLoading] = useState(true);

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
  const methods = useForm({
    defaultValues: {
      "module-id": "",
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
            onSelect={() => {}}
          />
        }
      >
        test
      </ComponentCard>
    </div>
  );
}
