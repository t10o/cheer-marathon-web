import { GoogleMap, PolylineF } from "@react-google-maps/api";
import { CSSProperties, useMemo } from "react";

interface Props {
  containerStyle: CSSProperties;
  path: google.maps.LatLngLiteral[];
  center: google.maps.LatLngLiteral;
}

export const Map = ({ containerStyle, path, center }: Props) => {
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
