import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home.tsx";
import { Run } from "../pages/Run.tsx";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<Run />} />
  </Routes>
);
