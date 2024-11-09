import { faBullhorn, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Location } from "../models/run.ts";
import { Run } from "../models/run.tsx";
import { Chat } from "./Chat";
import { Photo } from "./Photo/Photo.tsx";
import { Tab, TabItem } from "./Tab";

interface Props {
  id: string;
  isMobile: boolean;
  runData: Run;
  username: string | null;
  onPhotoClick: (location: Location, cb: () => void) => void;
}

export const Content = ({
  id,
  isMobile,
  runData,
  username,
  onPhotoClick,
}: Props) => {
  return (
    <div
      className={clsx(
        isMobile ? "h-3/5" : "h-full",
        isMobile ? "w-full" : ["min-w-96", "max-w-96"],
        "p-4",
        "pt-0",
        "relative",
        "pb-20",
      )}
    >
      <Tab defaultKey="chat">
        <TabItem
          tabKey="chat"
          label={
            <span>
              <FontAwesomeIcon className={clsx("mr-2")} icon={faBullhorn} />
              応援
            </span>
          }
        >
          <Chat
            id={id!}
            isCompleted={runData.status === "completed"}
            isMobile={isMobile}
            messages={runData.messages}
            fcmToken={runData.fcmToken}
            username={username}
          />
        </TabItem>

        <TabItem
          tabKey="photo"
          label={
            <span>
              <FontAwesomeIcon className={clsx("mr-2")} icon={faImage} />
              写真
            </span>
          }
        >
          <Photo photos={runData.photos} onPhotoClick={onPhotoClick} />
        </TabItem>
      </Tab>
    </div>
  );
};
