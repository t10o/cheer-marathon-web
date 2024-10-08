import { faRocket } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { sendPushNotification } from "@/actions/pushNotification";
import { ChatList, ChatMessage } from "@/app/[id]/components/Chat";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Spacer } from "@/components/Spacer";
import { db } from "@/libs/firebase";
import { Message } from "@/models/run";

interface Props {
  id: string;
  isMobile: boolean;
  messages: Message[];
  fcmToken: string;
  username: string | null;
}

export const Chat = ({ id, isMobile, messages, fcmToken, username }: Props) => {
  const [messageState, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = {
      name: username!,
      message: messageState,
      timestamp: Timestamp.fromDate(new Date()),
    };

    if (!message.message) {
      toast.error("メッセージが入力されていません");
      return;
    }

    if (!message.name) {
      toast.error("ユーザー名が入力されていません。リロードしてください。");
      return;
    }

    const docRef = doc(db, "runs", id);

    await updateDoc(docRef, {
      ["messages"]: arrayUnion(message),
    });

    await sendPushNotification(fcmToken, message.name, message.message);

    toast.success("メッセージを送信しました");

    setMessage("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div
      className={clsx(
        isMobile ? "h-3/5" : "h-full",
        isMobile ? "w-full" : "min-w-96",
        "p-4",
        "relative",
        "pb-20",
      )}
    >
      <ChatList>
        {messages?.map((message) => {
          return (
            <ChatMessage
              key={JSON.stringify(message)}
              name={message.name}
              message={message.message}
            />
          );
        })}
      </ChatList>

      <form
        className={clsx("absolute", "bottom-4", "right-4", "left-4")}
        onSubmit={handleSubmit}
      >
        <div className={clsx("w-full", "flex")}>
          <Input
            className={clsx("grow", "min-w-0")}
            value={messageState}
            onChange={handleChange}
          />

          <Spacer size="small" />

          <Button
            className={clsx("min-w-24")}
            type="submit"
            disabled={!username}
            label="送信"
            icon={faRocket}
          />
        </div>
      </form>
    </div>
  );
};
