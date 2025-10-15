"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import Button from "../ui/button/Button";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  pageSize?: number;
  page?: number;
  totalPage?: number;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function DataTable<T>({
  data,
  columns,
  loading = false,
  page = 1,
  totalPage = 1,
  onNext,
  onPrev,
}: DataTableProps<T>) {
  const [isLoading, setIsLoading] = useState(loading);
  const [isEmpty, setIsEmpty] = useState(data.length === 0);

  useEffect(() => {
    setIsLoading(loading);
    setIsEmpty(!loading && data.length === 0);
  }, [loading, data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 dark:text-gray-400">
        <ArchiveBoxXMarkIcon className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-sm text-gray-400">Belum ada data</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isFirst = index === 0;
                  const isLast = index === headerGroup.headers.length - 1;

                  let borderClass = "border-b";
                  if (isFirst) {
                    borderClass += " border-r";
                  } else if (isLast) {
                    borderClass += " border-l";
                  } else {
                    borderClass += " border-l border-r";
                  }

                  return (
                    <th
                      key={header.id}
                      className={`px-4 py-3 font-medium text-gray-700 ${borderClass}`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, rowIndex) => {
              const isLastRow =
                rowIndex === table.getRowModel().rows.length - 1;

              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    const isFirstCol = cellIndex === 0;
                    const isLastCol =
                      cellIndex === row.getVisibleCells().length - 1;

                    let borderClass = "";
                    if (!isLastRow) borderClass += " border-b"; // hanya beri border bawah jika bukan baris terakhir
                    if (isFirstCol) {
                      borderClass += " border-r";
                    } else if (isLastCol) {
                      borderClass += " border-l";
                    } else {
                      borderClass += " border-l border-r";
                    }

                    return (
                      <td
                        key={cell.id}
                        className={`px-4 py-4 text-sm text-gray-700 ${borderClass} border-gray-200`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="space-x-2 text-sm text-gray-400">
          <span>
            Halaman {page} dari {totalPage}
          </span>
        </div>

        <div className="flex flex-row space-x-4">
          <Button
            onClick={onPrev}
            disabled={page == 1}
            size="sm"
            className="h-[32px]"
          >
            Sebelumnya
          </Button>

          <Button
            onClick={onNext}
            disabled={page == totalPage}
            size="sm"
            className="h-[32px]"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
