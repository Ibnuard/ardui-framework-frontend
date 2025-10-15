import { NavItem } from "@/types";
import { FolderIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const sysadminNavItems: NavItem[] = [
  {
    icon: FolderIcon,
    name: "Module",
    subItems: [{ name: "Module Creator", path: "/" }],
  },
  {
    icon: UserGroupIcon,
    name: "User Management",
    subItems: [
      { name: "User", path: "/user" },
      { name: "User Role", path: "/user-role" },
    ],
  },
];
