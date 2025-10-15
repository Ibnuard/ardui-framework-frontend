import ModuleAdd from "@/components/module/ModuleAdd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI - Module Creator",
  description: "Create Module",
};

export default function Page() {
  return <ModuleAdd />;
}
