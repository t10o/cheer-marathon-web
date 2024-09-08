import { useState } from "react";

import { PullableModal } from "../common/PullableModal.tsx";

// interface Props {
//   chatList: ReactNode;
//   onSubmit: (message: Message) => void;
// }

export const MobileChat = () => {
  const [open, setOpen] = useState(false);

  setOpen(false);

  return <PullableModal isOpen={open} />;
};
