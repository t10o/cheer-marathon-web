import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useRunData } from "../hooks/useRunData.ts";

export const Run = () => {
  const { id } = useParams<{ id: string }>();

  const [size, setSize] = useState<google.maps.Size | null>(null);

  const { runData } = useRunData(id!);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const containerStyle = {
    width: "100%",
    height: "100dvh",
  };

  const polyline = useMemo(() => {
    const path = runData
      ? runData.route.map((route: { latitude: number; longitude: number }) => {
          return { lat: route.latitude, lng: route.longitude };
        })
      : [];

    return (
      <PolylineF
        path={path}
        options={{ strokeColor: "red", strokeWeight: 7 }}
      />
    );
  }, [runData]);

  const markers = useMemo(() => {
    return runData
      ? runData.photos.map(
          (photo: {
            location: { latitude: number; longitude: number };
            photoUrl: string;
          }) => {
            return (
              <MarkerF
                key={JSON.stringify(photo)}
                position={{
                  lat: photo.location.latitude,
                  lng: photo.location.longitude,
                }}
                icon={{
                  url: photo.photoUrl,
                  scaledSize: size,
                }}
              />
            );
          },
        )
      : [];
  }, [runData, size]);

  const onLoad = useCallback(() => {
    setSize(new window.google.maps.Size(131, 175));
  }, []);

  if (!runData || runData?.route.length <= 0) {
    return <div>ランニングが開始されたら画面が表示されます</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const center = {
    lat: runData!.route[runData!.route.length - 1].latitude,
    lng: runData?.route[runData!.route.length - 1].longitude,
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      onLoad={onLoad}
    >
      {markers.map((marker: typeof MarkerF) => marker)}
      {polyline}
    </GoogleMap>
  );
};
