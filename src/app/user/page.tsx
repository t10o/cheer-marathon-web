import { Metadata } from "next";

import { User } from "@/app/user/components/User";

export const metadata: Metadata = {
  title: "Cheer on Runner | ユーザー情報",
  description: "ユーザー情報の確認・編集ができます。",
};

export default function UserPage() {
  return <User />;
}
