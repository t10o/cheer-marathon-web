import { useState } from "react";

import { PullableModal } from "@/components/common/PullableModal";

// interface Props {
//   chatList: ReactNode;
//   onSubmit: (message: Message) => void;
// }

export const MobileChat = () => {
  const [open, setOpen] = useState(false);

  setOpen(false);

  return <PullableModal isOpen={open} />;
};
