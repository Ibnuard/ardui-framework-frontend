import {
  FolderIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React, { FC, ReactNode, useState } from "react";
import CardListItem from "./CardListItem";

interface CardMenuItemProps {
  title: string;
  renderAction?: ReactNode;
  actionClassName?: string;
  showIcon?: boolean;
  defaultExpanded?: boolean;
  subMenuList?: any;
}

const CardMenuItem: FC<CardMenuItemProps> = ({
  title,
  renderAction,
  actionClassName,
  showIcon,
  defaultExpanded = false,
  subMenuList = [],
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isExpandable = subMenuList != null && subMenuList?.length > 0;

  const handleToggle = () => {
    if (isExpandable) {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800">
      {/* Header */}
      <div
        onClick={handleToggle}
        className={
          "flex flex-row justify-between items-center p-4 cursor-pointer select-none " +
          (isExpandable ? "hover:bg-gray-50 dark:hover:bg-gray-700" : "")
        }
      >
        <div className="flex flex-row gap-4 items-center">
          {showIcon && (
            <FolderIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
          <div className="text-sm font-semibold text-gray-800 dark:text-white">
            {title}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {renderAction && (
            <div className={actionClassName}>{renderAction}</div>
          )}
          {isExpandable && (
            <div className="transition-transform">
              {expanded ? (
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-500" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {isExpandable && expanded && (
        <div className="border-t border-gray-100 dark:border-gray-700 p-4 text-sm text-gray-700 dark:text-gray-200">
          <div className="flex flex-col gap-2.5 ml-4">
            {subMenuList.map((item: any, index: number) => {
              return <CardListItem key={item + index} title="SubMenu View" />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMenuItem;
