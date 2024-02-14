import React from "react";
import { useNavigate } from "react-router-dom";
function EventsPage() {
  const nav = useNavigate();

  const handleNavigation = (page) => {
    nav(page);
  };
  return (
    <div className="upper-section  bg-cover bg-no-repeat bg-fixed bg-center h-full bg-[url('https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Signupbg.jpeg?alt=media&token=94bfbc88-78f6-4c8a-a749-19fcb76fe493')] ">
      <div className="justify-evenly align-middle flex w-2/3 sm:w-1/3 mx-auto">
        <h1 className="text-white font-neu text-7xl sm:text-8xl mt-24">E</h1>
        <h1 className="text-white font-neu text-7xl sm:text-8xl mt-24">V</h1>
        <h1 className="text-white font-neu text-7xl sm:text-8xl mt-24">E</h1>
        <h1 className="text-white font-neu text-7xl sm:text-8xl mt-24">N</h1>
        <h1 className="text-white font-neu text-7xl sm:text-8xl mt-24">T</h1>
        <h1 className="text-white font-neu text-7xl sm:text-8xl mt-24">S </h1>
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
              src="https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/CULTURAL%20EVENTS-1.jpg?alt=media&token=88369d0a-6c34-48b1-850c-cb82d1362780"
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
              src="https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Technical%20Events-min.png?alt=media&token=0d244ed6-3ceb-41f1-8eab-ec6b43aec7ed"
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
