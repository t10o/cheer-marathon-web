import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useParams } from "react-router-dom";

import { Map } from "../components/Map.tsx";

export const Run = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY} render={render}>
      <Map />
    </Wrapper>
  );
};
