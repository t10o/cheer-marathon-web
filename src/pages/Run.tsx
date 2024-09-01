import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { Map } from "../components/Map.tsx";
import { useRunData } from "../hooks/useRunData.ts";

export const Run = () => {
  const { id } = useParams<{ id: string }>();

  const { runData } = useRunData(id!);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const path = useMemo(() => {
    return runData
      ? runData.route.map((route: { latitude: number; longitude: number }) => {
          return { lat: route.latitude, lng: route.longitude };
        })
      : [];
  }, [runData]);

  if (path.length <= 0) {
    return <div>ランニングが開始されたら画面が表示されます</div>;
  }

  return (
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY} render={render}>
      <Map path={path} />
    </Wrapper>
  );
};
