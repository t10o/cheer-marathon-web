import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";

import { Message } from "../../models/run.tsx";
import { Button } from "../common/Button.tsx";
import { Input } from "../common/Input.tsx";
import { Spacer } from "../common/Spacer.tsx";

interface Props {
  chatList: ReactNode;
  onSubmit: (message: Message) => void;
}

export const DesktopChat = ({ chatList, onSubmit }: Props) => {
  const [messageState, setMessage] = useState("");

  useEffect(() => {}, [chatList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = {
      name: "hoge",
      message: messageState,
      timestamp: Timestamp.fromDate(new Date()),
    };

    setMessage("");

    onSubmit(message);
  };

  return (
    <div className={clsx("relative", "p-4", "pr-0", "h-[calc(100dvh_-_16px)]")}>
      {chatList}

      <form
        className={clsx("absolute", "bottom-0", "right-2", "left-2")}
        onSubmit={handleSubmit}
      >
        <div className={clsx("w-full", "flex", "flex-grow")}>
          <Input
            className={clsx("flex-grow")}
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
