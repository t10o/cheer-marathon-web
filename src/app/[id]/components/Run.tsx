"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

import { Content } from "@/app/[id]/components/Content";
import { UsernameModal } from "@/app/[id]/components/UsernameModal";
import { Map, Methods } from "@/components/Map";
import { USERNAME_KEY } from "@/constants";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRunData } from "@/hooks/useRunData";
import { Location } from "@/models/run";

export const Run = () => {
  const { id } = useParams<{ id: string }>();

  const { runData } = useRunData(id);
  const { isMobile } = useIsMobile();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    region: "JP",
    language: "ja",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [username] = useLocalStorage(USERNAME_KEY, "");
  const mapRef = useRef<Methods | null>(null);

  if (!username && !isOpen) {
    setIsOpen(true);
  }

  const path = runData
    ? runData.route.map((route) => {
        return { lat: route.latitude, lng: route.longitude };
      })
    : [];

  if (!runData || runData?.route.length <= 0) {
    return (
      <div
        className={clsx(
          "w-full",
          "h-full",
          "justify-center",
          "items-center",
          "flex",
        )}
      >
        <p>11月10日（日）8:20 スタート</p>
      </div>
    );
  }

  const center = {
    lat: runData.route[runData.route.length - 1].latitude,
    lng: runData.route[runData.route.length - 1].longitude,
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePhotoClick = (location: Location, cb: () => void) => {
    mapRef.current?.panTo({ lat: location.latitude, lng: location.longitude });
    cb();
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
      <div
        className={clsx(
          "absolute",
          "top-3",
          "left-0",
          "z-10",
          "w-full",
          "flex",
          "justify-center",
          "items-center",
          "font-bold",
        )}
      >
        🎉 ラン終了！お疲れ様でした！！！ 🎉
      </div>

      <Map
        ref={mapRef}
        containerStyle={{ width: "100%", height: isMobile ? "40%" : "100%" }}
        path={path}
        center={center}
      />

      <Content
        id={id!}
        isMobile={isMobile}
        runData={runData}
        username={username}
        onPhotoClick={handlePhotoClick}
      />

      <UsernameModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};
