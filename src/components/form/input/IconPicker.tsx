"use client";

import { FC, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Icon, IconName } from "@/icons/HeroIcons";
import IconSelectorModal from "@/components/modal/IconSelectorModal";
import Label from "../Label";

interface IconInputProps {
  name: string;
  label?: string;
  required?: boolean;
}

const IconInput: FC<IconInputProps> = ({ name, label, required }) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(
    value || undefined
  );

  const handleSelect = (icon: IconName) => {
    setSelectedIcon(icon);
    onChange(icon);
  };

  const IconComponent = selectedIcon ? Icon[selectedIcon] : Icon["CubeIcon"];

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label required={required}>
          {label} {required && <span className="text-error-500">*</span>}
        </Label>
      )}

      <div className="flex items-center gap-3">
        {/* Preview icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded border bg-gray-50 dark:bg-gray-800">
          <IconComponent className="w-6 h-6 text-gray-700 dark:text-white" />
        </div>

        {/* Button pilih icon */}
        <IconSelectorModal selected={selectedIcon} onSelect={handleSelect} />
      </div>

      {error?.message && (
        <p className="text-xs text-error-500 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default IconInput;
