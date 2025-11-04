import React from "react";
import SearchBar from "../input/components/SearchBar";
import Button from "../ui/button/Button";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  showSearchbar?: boolean;
  showActionButton?: boolean;
  actionButtonTitle?: string;
  onActionButtonPress?: () => void;
  onSearch?: (keyword: string) => void;
  actionButtonDisabled?: boolean;
  customActionButton?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  showSearchbar,
  showActionButton,
  actionButtonTitle,
  onActionButtonPress,
  onSearch,
  actionButtonDisabled,
  customActionButton,
  size = "md",
}) => {
  const HEADER_PADDING_SIZE = {
    sm: "px-3 py-2",
    md: "px-5 py-4",
    lg: "px-6 py-5",
  };

  const BODY_PADDING_SIZE = {
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`flex flex-col min-h-0 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Header */}
      <div
        className={`flex flex-row justify-between ${HEADER_PADDING_SIZE[size]} shrink-0`}
      >
        <div className="flex-1 flex flex-row items-center space-x-5">
          <div>
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
            {desc && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            )}
          </div>

          <div className="hidden lg:flex-1 sm:block">
            {showSearchbar && <SearchBar onSubmit={onSearch} />}
          </div>
        </div>

        {showActionButton && customActionButton == null ? (
          <div>
            <Button
              disabled={actionButtonDisabled}
              onClick={onActionButtonPress}
              size="sm"
              className="w-[125px]"
            >
              {actionButtonTitle ?? "Add"}
            </Button>
          </div>
        ) : (
          customActionButton
        )}
      </div>

      {showSearchbar && (
        <div className="pb-4 px-6 block sm:hidden shrink-0">
          <SearchBar className="w-full" onSubmit={onSearch} />
        </div>
      )}

      {/* Body — bagian ini bisa scroll */}
      <div
        className={`flex-1 min-h-0 overflow-auto border-t border-gray-100 dark:border-gray-800 ${BODY_PADDING_SIZE[size]}`}
      >
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
