import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { setStorageUsername } from "@/utils/localStorage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UsernameModal = ({ isOpen, onClose }: Props) => {
  const [username, setUsername] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      toast.error("ユーザー名を入力してください");
      return;
    }

    setStorageUsername(username);
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
            value={username}
            onChange={handleChange}
          />
        </div>

        <Button className={clsx("w-full")} label="登録" type="submit" />
      </form>
    </Modal>
  );
};
