import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  children?:
    | ReactElement<google.maps.marker.AdvancedMarkerElement>[]
    | ReactElement<google.maps.marker.AdvancedMarkerElement>;
  path?: { lat: number; lng: number }[];
}

export const Map = ({ children, path }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const DEFAULT = {
    CENTER: {
      lat: 35.6973225,
      lng: 139.8265658,
    } as google.maps.LatLngLiteral,
    ZOOM: 16,
  } as const;

  const VIEW_STYLE = {
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    if (ref.current && !map) {
      const center =
        path && path.length > 0
          ? { lat: path[path.length - 1].lat, lng: path[path.length - 1].lng }
          : DEFAULT.CENTER;

      const option = {
        center: center,
        zoom: DEFAULT.ZOOM,
      };

      setMap(new window.google.maps.Map(ref.current, option));
    }
  }, [ref, map]);

  useEffect(() => {
    if (path && map) {
      const polyline = new window.google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      polyline.setMap(map);
    }
  }, [path, map]);

  return (
    <>
      <div ref={ref} style={VIEW_STYLE} />

      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};
