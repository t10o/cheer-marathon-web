import { faRocket } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { db, functions } from "../../libs/firebase.ts";
import { Message } from "../../models/run.tsx";
import { Button } from "../Button.tsx";
import { Input } from "../Input.tsx";
import { Spacer } from "../Spacer.tsx";
import { ChatList } from "./ChatList.tsx";
import { ChatMessage } from "./ChatMessage.tsx";

interface Props {
  id: string;
  isCompleted: boolean;
  isMobile: boolean;
  messages: Message[];
  fcmToken: string;
  username: string | null;
}

export const Chat = ({
  id,
  isMobile,
  isCompleted,
  messages,
  fcmToken,
  username,
}: Props) => {
  const [messageState, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPushNotification = httpsCallable(functions, "sendPushNotification");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

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

    sendPushNotification({
      fcmToken,
      name: message.name,
      message: message.message,
    }).catch(() => {
      toast.error("プッシュ通知の送信に失敗しました");
      setLoading(false);
      return;
    });

    setLoading(false);

    toast.success("メッセージを送信しました");

    setMessage("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    // タブ分高さ引く。もっといいやり方あれば
    <div className={clsx("h-[calc(100%_-_60px)]")}>
      {isCompleted && (
        <div
          className={clsx(
            "flex",
            "justify-center",
            "items-center",
            "absolute",
            "w-full",
            "bg-white",
            "p-1",
          )}
        >
          🎉 ラン終了！お疲れ様でした！！ 🎉
        </div>
      )}

      <ChatList>
        {messages?.map((message) => {
          return (
            <ChatMessage
              key={JSON.stringify(message)}
              name={message.name}
              message={message.message}
              isMobile={isMobile}
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
            disabled={loading}
            onChange={handleChange}
          />

          <Spacer size="small" />

          <Button
            className={clsx("min-w-24")}
            type="submit"
            disabled={!username || loading}
            label="送信"
            icon={faRocket}
          />
        </div>
      </form>
    </div>
  );
};
