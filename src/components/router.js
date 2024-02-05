import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home'
import About from '../pages/About';
import Event from '../pages/Event';


export function RouterPaths() {
  // const location = useLocation();
  return (
    
      // <Routes location={location} key={location.pathname}>
      <Routes>
        <Route exact path="/" element= { <Home/>}/>
        <Route exact path="/about" element= {<About />} />
        <Route exact path="/event" element={<Event />} />

        
      </Routes>
   
  );
}