import RoleList from "@/components/user-management/role/RoleList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI - User Role",
  description: "User Role",
};
export default function LineChart() {
  return <RoleList />;
}
