import UserList from "@/components/user-management/user/UserList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArdUI - User List",
  description: "User List",
};
export default function LineChart() {
  return <UserList />;
}
