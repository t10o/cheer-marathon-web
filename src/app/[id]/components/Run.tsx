"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Content } from "@/app/[id]/components/Content";
import { UsernameModal } from "@/app/[id]/components/UsernameModal";
import { Map } from "@/components/Map";
import { USERNAME_KEY } from "@/constants";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRunData } from "@/hooks/useRunData";

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

  const [username] = useLocalStorage(USERNAME_KEY, "");

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
    <div
      className={clsx(
        "flex",
        "h-full",
        "w-full",
        isMobile ? "flex-col" : "flex-row",
      )}
    >
      <Map
        containerStyle={{ width: "100%", height: isMobile ? "40%" : "100%" }}
        path={path}
        center={center}
      />

      <Content
        id={id!}
        isMobile={isMobile}
        runData={runData}
        username={username}
      />

      <UsernameModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};
