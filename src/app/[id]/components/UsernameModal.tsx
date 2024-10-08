import clsx from "clsx";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Spacer } from "@/components/Spacer";
import { USERNAME_KEY } from "@/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Props {
  isOpen: boolean;
  canClose?: boolean;
  onClose: () => void;
}

export const UsernameModal = ({ isOpen, canClose = false, onClose }: Props) => {
  const [username, setUsername] = useLocalStorage(USERNAME_KEY, "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canClose && !username) {
      toast.error("ユーザー名を入力してください");
      return;
    }

    setUsername(username);
    toast.success("ユーザー名を設定しました");
    onClose();
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
      <form
        className={clsx("flex", "flex-col", "gap-4")}
        onSubmit={handleSubmit}
      >
        <div>
          <label id="username">ユーザー名</label>
          <Input
            id="username"
            className={clsx("w-full")}
            value={username || ""}
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
    </Modal>
  );
};
