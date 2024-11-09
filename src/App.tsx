import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Router } from "./routers/router.tsx";

function App() {
  return (
    <>
      <Analytics />

      <SpeedInsights />

      <ToastContainer />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
