import MenuManagement from "@/components/pages/menu/MenuManagement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI - Module Creator",
  description: "Module Creator",
};

export default function Page() {
  return <MenuManagement />;
}
