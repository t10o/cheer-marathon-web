import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { DeviceContext } from "./contexts/DeviceContext.ts";
import { useIsMobile } from "./hooks/useIsMobile.ts";
import { Router } from "./routers/router.tsx";

function App() {
  const { isMobile } = useIsMobile();

  return (
    <>
      <Analytics />

      <SpeedInsights />

      <ToastContainer />

      <DeviceContext.Provider value={{ isMobile }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DeviceContext.Provider>
    </>
  );
}

export default App;
