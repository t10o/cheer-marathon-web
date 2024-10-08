"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useState } from "react";

import { UsernameModal } from "@/app/[id]/components/UsernameModal";
import { Button } from "@/components/Button";

export const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={clsx(
          "h-14",
          "flex",
          "justify-between",
          "items-center",
          "p-4",
        )}
      >
        <div>ロゴ</div>

        <Button
          variant="text"
          label="ユーザー名変更"
          icon={faUser}
          onClick={handleClick}
        />
      </header>

      <UsernameModal isOpen={isOpen} canClose onClose={handleClose} />
    </>
  );
};
