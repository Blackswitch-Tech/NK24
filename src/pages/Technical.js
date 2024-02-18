import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";

const Technical = () => {
  const nav = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [curEvents, setCurEvents] = useState([]);
  const options = [
    { value: "All", label: "All" },
    { value: "Competition", label: "Competition" },
    { value: "Workshop", label: "Workshop" },
  ];
  useEffect(() => {
    const getData = async () => {
      await getDocs(collection(db, "events")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            ...docData,
            id: docData.id,
          };
        });
        setEvents(
          newData.filter(
            (event) => event.cat.trim().toLowerCase() === "technical"
          )
        );
        setCurEvents(
          newData.filter(
            (event) => event.cat.trim().toLowerCase() === "technical"
          )
        );
        setTimeout(() => setLoaded(true), 1000);
      });
    };
    getData();
  }, []);

  const handleChangeCategory = (category) => {
    if (category === "All") {
      setCurEvents(events);
    } else {
      setCurEvents(events.filter((event) => event.subcat === category));
    }
  };
  return (
    <div className="bg-cover bg-fixed bg-no-repeat h-auto min-h-screen bg-[url('https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Signupbg.jpeg?alt=media&token=94bfbc88-78f6-4c8a-a749-19fcb76fe493')] w-full px-5">
      <div className="flex justify-center items-center pt-32">
        <h1 className="text-white text-6xl font-neu sm:text-7xl tracking-widest">
          TECHNICAL
        </h1>
      </div>
      <div className="flex justify-center my-10">
        <div className="max-w-md w-full space-y-10">
          {/* Search Component Placeholder */}
          <div className="mt-10">
            <div className="relative">
              <select
                onChange={(item) => {
                  handleChangeCategory(item.target.value);
                }}
                className="peer h-full w-full font-pop rounded-lg bg-transparent px-3 py-2 text-sm font-normal text-white  border border-gray-700 focus:ring-2 focus:ring-gray-500 bg-black"
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value} className="font-pop bg-black">
                    {option.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-3 -top-5 text-xs font-pop text-gray-400 transition-all peer-focus:-top-5 peer-focus:text-gray-200 peer-focus:text-xs">
                Categories
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 my-12">
        {loaded ? (
          curEvents.map((event, index) => (
            <div
              className="hover:scale-110 transition duration-200 cursor-pointer rounded-2xl m-4"
              onClick={() => nav(`/events/technical/${event.id}`)}
            >
              <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full object-cover  h-120"
                  src={
                    event.imgurl
                      ? event.imgurl
                      : "https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/comingsoon.jpeg?alt=media&token=db8b5064-054e-45b9-9dc6-393ac6ebc840"
                  }
                  alt={event.id}
                />
              </div>
            </div>
          ))
        ) : (
          <div class="text-center h-screen just z-10 col-span-full">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Technical;
