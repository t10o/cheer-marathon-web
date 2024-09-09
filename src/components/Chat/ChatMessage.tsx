import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Spacer } from "@/components/common/Spacer";

interface Props {
  name: string;
  message: string;
}

export const ChatMessage = ({ name, message }: Props) => {
  return (
    <div className={clsx("w-full", "flex", "items-center")}>
      <FontAwesomeIcon size="xl" icon={faUser} />

      <Spacer size="small" />

      <div>
        <div className={clsx("text-sm")}>{name}</div>
        <div>{message}</div>
      </div>
    </div>
  );
};
