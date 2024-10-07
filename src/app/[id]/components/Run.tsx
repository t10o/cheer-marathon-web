"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Chat } from "@/app/[id]/components/Chat";
import { UsernameModal } from "@/app/[id]/components/UsernameModal";
import { Map } from "@/components/Map";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRunData } from "@/hooks/useRunData";
import { getStorageUsername } from "@/utils/localStorage";

export const Run = () => {
  const { id } = useParams<{ id: string }>();

  const { runData } = useRunData(id);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    region: "JP",
    language: "ja",
  });

  const { isMobile } = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);

  const username = getStorageUsername();

  if (!username && !isOpen) {
    setIsOpen(true);
  }

  const path = runData
    ? runData.route.map((route) => {
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

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={clsx("flex", "h-full", isMobile ? "flex-col" : "flex-row")}>
      <Map
        containerStyle={{ width: "100%", height: isMobile ? "40%" : "100%" }}
        path={path}
        center={center}
      />

      <Chat
        id={id!}
        isMobile={isMobile}
        messages={runData.messages}
        fcmToken={runData.fcmToken}
        username={username}
      />

      <UsernameModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};
