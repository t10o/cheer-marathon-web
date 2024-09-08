import { GoogleMap, PolylineF } from "@react-google-maps/api";
import { useMemo } from "react";

interface Props {
  path: google.maps.LatLngLiteral[];
  center: google.maps.LatLngLiteral;
}

export const Map = ({ path, center }: Props) => {
  const containerStyle = {
    width: "100%",
    height: "100dvh",
  };

  const polyline = useMemo(() => {
    return (
      <PolylineF
        path={path}
        options={{ strokeColor: "red", strokeWeight: 7 }}
      />
    );
  }, [path]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
      {polyline}
    </GoogleMap>
  );
};
