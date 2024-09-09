import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { ChatList } from "@/components/Chat/ChatList";
import { ChatMessage } from "@/components/Chat/ChatMessage";
import { DesktopChat } from "@/components/Chat/DesktopChat";
import { MobileChat } from "@/components/Chat/MobileChat";
import { db } from "@/libs/firebase";
import { Message } from "@/models/run";

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
  );

  return isMobile ? (
    <MobileChat />
  ) : (
    <DesktopChat chatList={Chats} onSubmit={handleSubmit} />
  );
};
