import UserAdd from "@/components/user-management/user/UserAdd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI - User",
  description: "User Add",
};
export default function LineChart() {
  return <UserAdd />;
}
