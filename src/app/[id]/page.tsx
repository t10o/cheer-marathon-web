import { Metadata } from "next";

import { Run } from "@/app/[id]/components/Run";

export const metadata: Metadata = {
  title: "応援ロケット | 三谷さんを応援しよう",
  description:
    "位置情報の確認、応援メッセージの送信ができます。完走を目指して、みんなで盛り上げましょう！",
};

export default function RunPage() {
  return <Run />;
}
