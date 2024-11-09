import clsx from "clsx";

import { Location, Photo as IPhoto } from "../../models/run.ts";

interface Props {
  photos: IPhoto[];
  onPhotoClick: (location: Location, cb: () => void) => void;
}

export const Photo = ({ photos, onPhotoClick }: Props) => {
  return (
    <>
      <div className={clsx("h-full", "w-full", "overflow-y-scroll")}>
        <div className={clsx("flex", "flex-wrap")}>
          {photos.map((photo, index) => {
            return (
              <img
                key={photo.timestamp}
                className={clsx(
                  "grow",
                  "object-cover",
                  "h-48",
                  "max-w-44",
                  "m-0.5",
                  "rounded",
                )}
                src={photo.photoUrl}
                alt={`ランナーが送信した画像${index}枚目`}
                onClick={() => onPhotoClick(photo.location, () => {})}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
