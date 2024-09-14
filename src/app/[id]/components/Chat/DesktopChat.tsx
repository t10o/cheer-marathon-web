import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Spacer } from "@/components/Spacer";
import { Message } from "@/models/run";

interface Props {
  username: string;
  chatList: ReactNode;
  onSubmit: (message: Message) => void;
}

export const DesktopChat = ({ username, chatList, onSubmit }: Props) => {
  const [messageState, setMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = {
      name: username,
      message: messageState,
      timestamp: Timestamp.fromDate(new Date()),
    };

    setMessage("");

    onSubmit(message);
  };

  return (
    <div
      className={clsx(
        "relative",
        "p-4",
        "pr-0",
        "h-[calc(100dvh_-_16px_-_56px)]",
      )}
    >
      {chatList}

      <form
        className={clsx("absolute", "bottom-0", "right-2", "left-2")}
        onSubmit={handleSubmit}
      >
        <div className={clsx("w-full", "flex", "grow")}>
          <Input
            className={clsx("grow")}
            value={messageState}
            onChange={handleChange}
          />

          <Spacer size="small" />

          <Button type="submit" label="送信" icon={faPaperPlane} />
        </div>
      </form>
    </div>
  );
};
