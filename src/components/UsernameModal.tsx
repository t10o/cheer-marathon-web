import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { USERNAME_KEY } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { Button } from "./Button.tsx";
import { Input } from "./Input.tsx";
import { Modal } from "./Modal.tsx";
import { Spacer } from "./Spacer.tsx";

interface Props {
  isOpen: boolean;
  canClose?: boolean;
  onClose: () => void;
}

export const UsernameModal = ({ isOpen, canClose = false, onClose }: Props) => {
  const [username, setUsername] = useLocalStorage(USERNAME_KEY, "");
  const [enteredUsername, setEnteredUsername] = useState(username);
  const [isUsernameUpdated, setUsernameUpdated] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredUsername(event.target.value);
  };

  const handleReloadClick = () => {
    window.location.reload();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canClose && !enteredUsername) {
      toast.error("ユーザー名を入力してください");
      return;
    }

    setUsername(enteredUsername);

    setUsernameUpdated(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: "fit-content",
          height: "fit-content",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      shouldCloseOnOverlayClick={canClose}
    >
      {isUsernameUpdated ? (
        <div className={clsx("flex", "flex-col")}>
          <p>ユーザー名を変更しました。</p>
          <p>リロードしてください。</p>

          <Spacer tag="div" size="small" />

          <Button label="リロード" onClick={handleReloadClick} />
        </div>
      ) : (
        <form
          className={clsx("flex", "flex-col", "gap-4")}
          onSubmit={handleSubmit}
        >
          <div>
            <label id="username">ユーザー名</label>
            <Input
              id="username"
              className={clsx("w-full", "max-w-60")}
              value={enteredUsername}
              onChange={handleChange}
            />
          </div>

          <div className={clsx("flex")}>
            {canClose && (
              <>
                <Button
                  className={clsx("min-w-28")}
                  variant="outlined"
                  label="閉じる"
                  type="button"
                  onClick={onClose}
                />

                <Spacer size="small" />
              </>
            )}

            <Button
              className={clsx(canClose ? "min-w-28" : "w-full")}
              label="登録"
              type="submit"
            />
          </div>
        </form>
      )}
    </Modal>
  );
};
