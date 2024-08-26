import "./App.css";

import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routers/router.tsx";

function App() {
  return (
    <>
      <Analytics />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
