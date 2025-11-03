import { LayoutBuilderView } from "@/components/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI Version 0.0.1",
  description: "Layout Builder",
};

export default function Page() {
  return <LayoutBuilderView />;
}
