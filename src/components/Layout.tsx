import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";

import clsx from "clsx";
import { Outlet } from "react-router-dom";

import { AppBar } from "./AppBar.tsx";

export default function RootLayout() {
  return (
    <>
      <AppBar />

      <main className={clsx("w-full", "h-[calc(100dvh_-_56px)]")}>
        <Outlet />
      </main>
    </>
  );
}
