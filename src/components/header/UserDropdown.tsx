"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import {ArrowLeftEndOnRectangleIcon, ChevronDownIcon} from "@heroicons/react/24/outline"
import {UserCircleIcon} from "@heroicons/react/24/solid"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.stopPropagation();
  setIsOpen((prev) => !prev);
}

 const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
    window.location.href = '/auth/signin';
  };

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown} 
        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
      >
        <span className="mr-2 overflow-hidden rounded-full h-11 w-11">
          <UserCircleIcon className="size-11" />
        </span>
        <ChevronDownIcon className={`size-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            System Admin
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            sysadmin@email.com
          </span>
        </div>
        <div
        onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <ArrowLeftEndOnRectangleIcon className="size-6 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          Keluar
        </div>
      </Dropdown>
    </div>
  );
}
