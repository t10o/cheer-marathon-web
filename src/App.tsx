import "./App.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routers/router.tsx";

function App() {
  return (
    <>
      <Analytics />

      <SpeedInsights />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
