import { ModuleView } from "@/components/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI Version 0.0.1",
  description: "Module Management",
};

export default function Page() {
  return <ModuleView />;
}
