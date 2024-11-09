import { faUser } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";

import logo from "../assets/logo.png";
import { Button } from "./Button.tsx";
import { UsernameModal } from "./UsernameModal.tsx";

export const AppBar = () => {
  const { id } = useParams<{ id: string }>();
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
        <img src={logo} alt="ロゴ" width={180} height={38} />

        {id && (
          <Button
            className={clsx("pr-0")}
            variant="text"
            color="text"
            label="ユーザー名変更"
            icon={faUser}
            onClick={handleClick}
          />
        )}
      </header>

      <UsernameModal isOpen={isOpen} canClose onClose={handleClose} />
    </>
  );
};
