import React from "react";
import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EventsPage from "../pages/EventsPage";
import Cultural from "../pages/Cultural";
import Technical from "../pages/Technical";

export function RouterPaths() {
  const location = useLocation();
  return (
    
      <Routes location={location} key={location.pathname}>
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/cultural" element={<Cultural />} />
          <Route path="/events/technical" element={<Technical />} />
      </Routes>
   
  );
}