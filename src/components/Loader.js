import React from "react";
import "./styles.css"

export const Loader = () => {
  return (
    <div id="loadingBox" className="z-10">
      <img
        id="loading"
        src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/loadnew.gif?alt=media&token=19eedb4e-5a84-4b6b-bd83-39dbf847e425"
        alt="loading"
      />
    </div>
  );
};