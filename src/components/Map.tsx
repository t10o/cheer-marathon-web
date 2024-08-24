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
}

export const Map = ({ children }: Props) => {
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
    aspectRatio: "16 / 9",
  };

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: DEFAULT.CENTER,
        zoom: DEFAULT.ZOOM,
      };

      setMap(new window.google.maps.Map(ref.current, option));
    }
  }, [ref, map]);

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
