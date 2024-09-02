import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GTAG);
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);
};
