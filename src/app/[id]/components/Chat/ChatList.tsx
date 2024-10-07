import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
}

export const ChatList = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const wasAtBottomRef = useRef(true);

  useEffect(() => {
    const chatList = ref.current;

    if (chatList) {
      const isAtBottom =
        chatList.scrollHeight - chatList.scrollTop === chatList.clientHeight;

      if (isAtBottom || wasAtBottomRef.current) {
        chatList.scrollTop = chatList.scrollHeight;
      }

      wasAtBottomRef.current = isAtBottom;
    }
  }, [children]);

  const handleScroll = () => {
    const chatList = ref.current;
    if (chatList) {
      wasAtBottomRef.current =
        chatList.scrollHeight - chatList.scrollTop === chatList.clientHeight;
    }
  };

  return (
    <div
      ref={ref}
      className={clsx("flex", "flex-col", "gap-4", "h-full", "overflow-scroll")}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};
