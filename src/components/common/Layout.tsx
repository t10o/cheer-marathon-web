import { Outlet } from "react-router-dom";

import { usePageTracking } from "../../hooks/usePageTracking.ts";

export const Layout = () => {
  usePageTracking();

  return (
    <>
      <Outlet />
    </>
  );
};
