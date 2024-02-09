import React from "react";
import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "../pages/Homepage";

import Signup from "../pages/signup.js"

import EventsPage from "../pages/EventsPage";
import Cultural from "../pages/Cultural";
import Technical from "../pages/Technical";

import Privacy from "../pages/policy/Privacy"
import Refund from "../pages/policy/refund"
import Terms from "../pages/policy/terms"


import Credits from "../pages/Credits";


export function RouterPaths() {
  const location = useLocation();
  return (
    
      <Routes location={location} key={location.pathname}>

         <Route path="/" element={<Homepage />} />

        <Route path="/terms" element={<Terms/>}/>
        <Route exact path="/Signup" element={<Signup/>} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/cultural" element={<Cultural />} />
          <Route path="/events/technical" element={<Technical />} />

          
          <Route path="/credits" element={<Credits />} />



      </Routes>
   
  );
}