import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Spacer } from "../Spacer.tsx";

interface Props {
  name: string;
  message: string;
  isMobile: boolean;
}

export const ChatMessage = ({ name, message, isMobile }: Props) => {
  return (
    <div className={clsx("w-full", "flex", "items-center")}>
      <FontAwesomeIcon size={isMobile ? "lg" : "xl"} icon={faUserAstronaut} />

      <Spacer size="small" />

      <div>
        <div className={clsx(isMobile ? "text-xs" : "text-sm")}>{name}</div>
        <div className={clsx(isMobile && "text-sm")}>{message}</div>
      </div>
    </div>
  );
};
