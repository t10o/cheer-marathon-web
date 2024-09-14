import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { sendPushNotification } from "@/actions/pushNotification";
import { ChatList } from "@/app/[id]/components/Chat/ChatList";
import { ChatMessage } from "@/app/[id]/components/Chat/ChatMessage";
import { DesktopChat } from "@/app/[id]/components/Chat/DesktopChat";
import { MobileChat } from "@/app/[id]/components/Chat/MobileChat";
import { db } from "@/libs/firebase";
import { Message } from "@/models/run";

interface Props {
  isMobile: boolean;
  id: string;
  messages: Message[];
  fcmToken: string;
}

export const Chat = ({ isMobile, id, messages, fcmToken }: Props) => {
  const handleSubmit = async (message: Message) => {
    if (message.message === "") {
      toast.error("メッセージが入力されていません");
      return;
    }

    const docRef = doc(db, "runs", id);

    await updateDoc(docRef, {
      ["messages"]: arrayUnion(message),
    });

    await sendPushNotification(fcmToken, "hoge", message.message);

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
