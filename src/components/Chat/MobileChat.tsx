import { ReactNode, useState } from "react";

import { Message } from "../../models/run.tsx";
import { PullableModal } from "../common/PullableModal.tsx";

interface Props {
  chatList: ReactNode;
  onSubmit: (message: Message) => void;
}

export const MobileChat = ({ chatList, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  return <PullableModal isOpen={open} />;
};
