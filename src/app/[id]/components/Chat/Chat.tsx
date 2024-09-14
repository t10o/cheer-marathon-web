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
  username: string | null;
}

export const Chat = ({ isMobile, id, messages, fcmToken, username }: Props) => {
  const handleSubmit = async (message: Message) => {
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
    <DesktopChat username={username} chatList={Chats} onSubmit={handleSubmit} />
  );
};
