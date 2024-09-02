import { Route, Routes } from "react-router-dom";

import { Layout } from "../components/Layout.tsx";
import { Home } from "../pages/Home.tsx";
import { Run } from "../pages/Run.tsx";

export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Run />} />
    </Route>
  </Routes>
);
