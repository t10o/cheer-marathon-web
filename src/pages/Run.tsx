import { useJsApiLoader } from "@react-google-maps/api";
import clsx from "clsx";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";

import { Chat } from "../components/Chat/Chat.tsx";
import { Map } from "../components/Map/Map.tsx";
import { DeviceContext } from "../contexts/DeviceContext.ts";
import { useRunData } from "../hooks/useRunData.ts";

export const Run = () => {
  const { id } = useParams<{ id: string }>();

  const { runData } = useRunData(id!);
  const { isMobile } = useContext(DeviceContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const path = runData
    ? runData.route.map((route: { latitude: number; longitude: number }) => {
        return { lat: route.latitude, lng: route.longitude };
      })
    : [];

  if (!runData || runData?.route.length <= 0) {
    return <div>ランニングが開始されたら画面が表示されます</div>;
  }

  const center = {
    lat: runData.route[runData.route.length - 1].latitude,
    lng: runData.route[runData.route.length - 1].longitude,
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Split
      className={clsx("flex")}
      sizes={[70, 34]}
      gutterStyle={() => ({})}
      gutter={() => {
        const gutterElement = document.createElement("div");
        gutterElement.className = `w-1.5 bg-amber-500`;
        return gutterElement;
      }}
    >
      <Map path={path} center={center} />

      <Chat isMobile={isMobile} id={id!} messages={runData.messages} />
    </Split>
  );
};
