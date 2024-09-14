"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Split from "react-split";

import { Chat } from "@/app/[id]/components/Chat/Chat";
import { Map } from "@/app/[id]/components/Map";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRunData } from "@/hooks/useRunData";
import { getStorageUsername } from "@/utils/localStorage";

export const Run = () => {
  const { id } = useParams<{ id: string }>();

  const { runData } = useRunData(id);
  const { isMobile } = useIsMobile();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const router = useRouter();

  const username = getStorageUsername();

  useEffect(() => {
    if (!username) {
      router.push("/user");
    }
  }, [router, username]);

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

      <Chat
        isMobile={isMobile}
        id={id!}
        messages={runData.messages}
        fcmToken={runData.fcmToken}
        username={username!}
      />
    </Split>
  );
};
