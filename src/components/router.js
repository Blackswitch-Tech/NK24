import React from "react";
import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "../pages/Homepage";

import Dash from "../pages/Dash.js"



import EventsPage from "../pages/EventsPage";
import Cultural from "../pages/Cultural";
import Technical from "../pages/Technical";
import EventDescPage from "../pages/EventDescPage";

import Privacy from "../pages/policy/Privacy";
import Refund from "../pages/policy/Refund.js";
import Terms from "../pages/policy/Terms.js";

import Credits from "../pages/Credits";
import UpdateProfile from "../pages/UpdateProfile";
import Signup from "../pages/Signup.js";


export function RouterPaths() {
  const location = useLocation();
  return (


        




      <Routes>
   

  
      <Route path="/" element={<Homepage />} />
<Route path="/dashboard" element={<Dash />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/cultural" element={<Cultural />} />
      <Route path="/events/technical" element={<Technical />} />
      <Route path="/events/cultural/:id" element={<EventDescPage />} />
      <Route path="/events/cultural/:id" element={<EventDescPage />} />
      <Route path="/update_profile" element={<UpdateProfile/>}/>
      <Route path="/credits" element={<Credits />} />
    </Routes>

  );
}
