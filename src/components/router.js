import React from "react";
import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EventsPage from "../pages/EventsPage";


export function RouterPaths() {
  const location = useLocation();
  return (
    
      <Routes location={location} key={location.pathname}>
          <Route path="/events" element={<EventsPage />} />
      </Routes>
   
  );
}