"use client";

import clsx from "clsx";

export const AppBar = () => {
  return (
    <header
      className={clsx("h-14", "flex", "justify-between", "items-center", "p-4")}
    >
      <div>ロゴ</div>
    </header>
  );
};
