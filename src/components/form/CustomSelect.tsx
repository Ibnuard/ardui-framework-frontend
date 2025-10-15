"use client";

import React from "react";
import ReactSelect, { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string | number;
  error?: boolean;
  hint?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  value: string | undefined;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  error = false,
  hint,
  isClearable = true,
  isSearchable = true,
  value,
}) => {
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: "44px",
      backgroundColor: "transparent",
      borderRadius: "0.5rem",
      borderColor: error
        ? "#f87171"
        : state.isFocused
        ? "#60a5fa"
        : "rgb(209 213 219)",
      boxShadow: state.isFocused ? "0 0 0 3px #60a5fa33" : "none",
      fontSize: "0.875rem",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#9ca3af",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#374151",
    }),
    input: (base: any) => ({
      ...base,
      color: "#374151",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#f3f4f6"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      fontSize: "0.875rem",
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 50,
    }),
  };

  return (
    <div className={`w-full space-y-1 ${className}`}>
      <ReactSelect
        options={options}
        placeholder={placeholder}
        value={selectedOption}
        isClearable={isClearable}
        isSearchable={isSearchable}
        styles={customStyles}
        onChange={(option: SingleValue<Option>) => {
          onChange(option?.value ?? "");
        }}
      />
      {error && hint && (
        <p className="text-sm text-red-500 dark:text-red-400">{hint}</p>
      )}
    </div>
  );
};

export default CustomSelect;
