import React from "react";
import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SignInComponent from '.././pages/signup';
//import UpdateComponent from '.././pages/update';


export function RouterPaths() {
  const location = useLocation();
  return (
    
      <Routes location={location} key={location.pathname}>
        <Route exact path="/signup" element={<SignInComponent></SignInComponent>} />
        
        
      </Routes>
   
  );
}