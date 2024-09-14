"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AppBar = () => {
  const pathname = usePathname();

  return (
    <header
      className={clsx("h-14", "flex", "justify-between", "items-center", "p-4")}
    >
      <div>ロゴ</div>

      <Link
        className={clsx(
          pathname === "/user" ? "hidden" : "flex",
          "items-center",
          "gap-2",
        )}
        href="/user"
      >
        <FontAwesomeIcon className={clsx("w-6", "h-6")} icon={faUser} />
        <p>ユーザー名変更</p>
      </Link>
    </header>
  );
};
