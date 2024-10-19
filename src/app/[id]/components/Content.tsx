import { faBullhorn, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Chat } from "@/app/[id]/components/Chat";
import { Photo } from "@/app/[id]/components/Photo/Photo";
import { Tab, TabItem } from "@/components/Tab";
import { Location, Run } from "@/models/run";

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
        isMobile ? "w-full" : "min-w-96",
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
