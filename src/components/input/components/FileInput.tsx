import React, { FC } from "react";

interface FileResult {
  base64: string;
  filename: string;
}

interface FileInputProps {
  className?: string;
  /** Callback tunggal yang mengembalikan base64 dan nama file */
  onResult?: (result: FileResult) => void;
  /** Menonaktifkan input file */
  disabled?: boolean;
}

const FileInput: FC<FileInputProps> = ({
  className = "",
  onResult,
  disabled = false,
}) => {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || disabled) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onResult?.({ base64, filename: file.name });
    };
    reader.readAsDataURL(file);
  };

  return (
    <input
      type="file"
      disabled={disabled}
      className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors
      file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50
      file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300
      dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400
      ${disabled ? "cursor-not-allowed opacity-70 file:cursor-not-allowed" : ""}
      ${className}`}
      onChange={handleChange}
    />
  );
};

export default FileInput;
