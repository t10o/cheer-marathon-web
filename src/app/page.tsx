import { Metadata } from "next";

export const metadata: Metadata = {
  title: "応援ロケット",
  description:
    "マラソンランナーの応援ができるサービスです。ランナーが今どこを走っているかを確認したり、応援メッセージを送ることができます。",
};

export default function HomePage() {
  return (
    <>
      <div>Home</div>
    </>
  );
}
