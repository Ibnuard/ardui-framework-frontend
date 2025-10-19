import { MenuManagement } from "@/components/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI Version 0.0.1",
  description: "Menu Management",
};

export default function Page() {
  return <MenuManagement />;
}
