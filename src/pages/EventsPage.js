import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
function EventsPage() {
  const nav=useNavigate();

  const handleNavigation =(page) => {
    nav(page);
  }
  return (
    <div className="w-full ">
      <div className="justify-center align-middle flex">
        <h1 className="text-white font-libre text-7xl mt-8">Events 2024</h1>
      </div>
      <div className="flex flex-col lg:flex-row mt-20 align-middle justify-around h-1/3">
        <div className="w-8/12 lg:w-1/3 m-auto" onClick={()=>{handleNavigation("cultural")}}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/CULTURAL%20EVENTS-1.png?alt=media&token=48777f84-42c5-4097-9aeb-160858e5d8ef"
            alt="event"
            className="rounded-2xl"
          />
        </div>
        <div className="w-8/12 lg:w-1/3 m-auto" onClick={()=>{handleNavigation("technical")}}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Technical%20Events.png?alt=media&token=f0dfb5e8-dee8-4d0e-a307-642b8b8e3cbc"
            alt="event"
            className=" rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
