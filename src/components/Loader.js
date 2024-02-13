import React from "react";
import "./styles.css"
import loading from '../assets/NKanimation.gif'

export const Loader = () => {
  return (
    <div id="loadingBox" className="z-10">
      <img
        id="loading"
        src={loading}
        alt="loading"
      />
    </div>
  );
};