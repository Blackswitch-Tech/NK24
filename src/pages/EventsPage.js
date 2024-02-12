import React from "react";
import { useNavigate } from "react-router-dom";
function EventsPage() {
  const nav = useNavigate();

  const handleNavigation = (page) => {
    nav(page);
  };
  return (
    <div className="upper-section  bg-cover bg-no-repeat bg-fixed bg-center h-full bg-gradient-to-b from-gray-900 to-black ">
      <div className="justify-evenly align-middle flex w-2/3 sm:w-1/3 mx-auto">
        <h1 className="text-white font-pop text-7xl sm:text-8xl mt-24">E</h1>
        <h1 className="text-white font-pop text-7xl sm:text-8xl mt-24">V</h1>
        <h1 className="text-white font-pop text-7xl sm:text-8xl mt-24">E</h1>
        <h1 className="text-white font-pop text-7xl sm:text-8xl mt-24">N</h1>
        <h1 className="text-white font-pop text-7xl sm:text-8xl mt-24">T</h1>
        <h1 className="text-white font-pop text-7xl sm:text-8xl mt-24">S </h1>
      </div>
      <div className="flex flex-col lg:flex-row mt-16 align-middle lg:justify-around h-1/3">
        <div></div>
        <div
          className="w-9/12 lg:w-1/3 mx-auto sm:mx-0 mb-14 outline-4  border-white"
          onClick={() => {
            handleNavigation("cultural");
          }}
        >
          <div className=" hover:scale-110 transition duration-200 cursor-pointer rounded-2xl">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/CULTURAL%20EVENTS-1.png?alt=media&token=48777f84-42c5-4097-9aeb-160858e5d8ef"
                alt="event"
                className="rounded-2xl"
              />
          </div>
        </div>
        <div
          className="w-9/12 lg:w-1/3 mx-auto sm:mx-0"
          onClick={() => {
            handleNavigation("technical");
          }}
        >
          <div className=" hover:scale-110 transition duration-200 cursor-pointer rounded-2xl">
            
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Technical%20Events.png?alt=media&token=f0dfb5e8-dee8-4d0e-a307-642b8b8e3cbc"
                alt="event"
                className=" rounded-2xl"
              />
    
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default EventsPage;
