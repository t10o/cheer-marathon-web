import "./App.css";

import { Status, Wrapper } from "@googlemaps/react-wrapper";

import { Map } from "./components/Map.tsx";

function App() {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <>
      <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY} render={render}>
        <Map />
      </Wrapper>
    </>
  );
}

export default App;
