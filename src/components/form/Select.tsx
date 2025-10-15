import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  error?: boolean;
  hint?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  error = false,
  hint,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="w-full space-y-1">
      <select
        className={`
          h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs 
          placeholder:text-gray-400 focus:outline-hidden focus:ring-3 
          dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
          ${
            error
              ? "border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-300/10"
              : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800"
          }
          ${
            selectedValue
              ? "text-gray-800 dark:text-white/90"
              : "text-gray-400 dark:text-gray-400"
          } 
          ${className}
        `}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="" disabled className="text-gray-700 dark:text-gray-400">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:text-gray-400 dark:bg-gray-900"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && hint && (
        <p className="text-sm text-red-500 dark:text-red-400">{hint}</p>
      )}
    </div>
  );
};

export default Select;
