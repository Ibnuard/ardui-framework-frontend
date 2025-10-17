import { NavItem } from "@/types";
import { FolderIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const sysadminNavItems: NavItem[] = [
  {
    icon: FolderIcon,
    name: "Menu",
    subItems: [{ name: "Menu Management", path: "/menu-management" }],
  },
];
