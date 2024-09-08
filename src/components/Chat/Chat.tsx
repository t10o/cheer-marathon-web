import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../../libs/firebase.ts";
import { Message } from "../../models/run.tsx";
import { ChatList } from "./ChatList.tsx";
import { ChatMessage } from "./ChatMessage.tsx";
import { DesktopChat } from "./DesktopChat.tsx";
import { MobileChat } from "./MobileChat.tsx";

interface Props {
  isMobile: boolean;
  id: string;
  messages: Message[];
}

export const Chat = ({ isMobile, id, messages }: Props) => {
  const handleSubmit = async (message: Message) => {
    if (message.message === "") {
      toast.error("メッセージが入力されていません");
      return;
    }

    const docRef = doc(db, "runs", id);

    await updateDoc(docRef, {
      ["messages"]: arrayUnion(message),
    });

    toast.success("メッセージを送信しました");
  };

  const Chats = (
    <ChatList>
      {messages.map((message) => {
        return (
          <ChatMessage
            key={JSON.stringify(message)}
            name={message.name}
            message={message.message}
          />
        );
      })}
    </ChatList>
  );

  return isMobile ? (
    <MobileChat />
  ) : (
    <DesktopChat chatList={Chats} onSubmit={handleSubmit} />
  );
};
