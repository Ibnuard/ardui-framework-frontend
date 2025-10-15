import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type TSearchBar = {
  onSubmit?: (keyword: string) => void;
};

export default function SearchBar({ onSubmit }: TSearchBar) {
  const [keyword, setKeyword] = useState("");

  const handleClear = () => {
    setKeyword("");
    if (onSubmit) onSubmit("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(keyword);
      }}
    >
      <div className="relative w-full max-w-lg">
        {/* Left Icon */}
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </span>

        {/* Input */}
        <input
          type="text"
          placeholder="Cari..."
          className="w-full h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Right Icon (clear) */}
        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-white/40 dark:hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}
