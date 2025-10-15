import ModuleDetail from "@/components/module/ModuleDetail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI - Module Creator",
  description: "Module Detail",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ModuleDetail moduleId={id} />;
}
