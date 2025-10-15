import React, { FC, ReactNode } from "react";

interface CardListItemProps {
  title: string;
  description?: string;
  renderAction?: ReactNode;
  actionClassName?: string;
}

const CardListItem: FC<CardListItemProps> = ({
  title,
  description,
  renderAction,
  actionClassName,
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div>
        <div className="text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </div>
        {description && (
          <p className="text-xs text-gray-400 dark:text-white/70">
            {description}
          </p>
        )}
      </div>
      <div className={actionClassName}>{renderAction}</div>
    </div>
  );
};

export default CardListItem;
