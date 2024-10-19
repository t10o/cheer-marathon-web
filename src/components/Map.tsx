import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";
import {
  CSSProperties,
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

interface Props {
  containerStyle: CSSProperties;
  path: google.maps.LatLngLiteral[];
  center: google.maps.LatLngLiteral;
}

export interface Methods {
  panTo: (latlng: google.maps.LatLngLiteral) => void;
}

export const Map = forwardRef(
  ({ containerStyle, path, center }: Props, ref) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<ReactElement>();

    // コンポーネント設計ミスってそう
    useImperativeHandle(ref, () => ({
      panTo(latlng: google.maps.LatLngLiteral) {
        if (!mapRef) return;

        mapRef.current?.panTo(latlng);
        setMarker(<MarkerF position={latlng} />);
      },
    }));

    const polyline = useMemo(() => {
      return (
        <PolylineF
          path={path}
          options={{ strokeColor: "red", strokeWeight: 7 }}
        />
      );
    }, [path]);

    const handleLoad = (map: google.maps.Map) => {
      mapRef.current = map;
    };

    const handleUnmount = () => {
      mapRef.current = null;
    };

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        onLoad={handleLoad}
        onUnmount={handleUnmount}
      >
        {marker}
        {polyline}
      </GoogleMap>
    );
  },
);

Map.displayName = "Map";
