import React, { useState, useEffect, Suspense } from "react";
import { Input } from "@material-tailwind/react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore/lite";
import { Loader } from "../components/loader";
import { wait } from "@testing-library/user-event/dist/utils";

const Cultural = () => {
  // Your component logic goes here
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const options = [
    { value: "Dance", label: "Dance" },
    { value: "Music", label: "Music" },
    { value: "Art", label: "Art" },
    { value: "Drama", label: "Drama" },
    { value: "Literature", label: "Literature" },
    { value: "Craft", label: "Craft" },
  ];

  useEffect(() => {
    // Your code here
    const getData = async () => {
      await getDocs(collection(db, "events")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(newData.filter((event) => event.cat === "Cultural"));
        wait(1000);
        setLoaded(true);
      });
    };
    getData();
  }, []);

  return (
    <div className="bg-cover bg-fixed bg-no-repeat h-auto min-h-screen bg-gradient-to-b from-gray-900 to-black w-full px-5">
      <div className="flex justify-center items-center pt-32">
        <h1 className="text-white text-6xl font-neu sm:text-7xl tracking-widest">
          Cultural
        </h1>
      </div>
      <div className="flex justify-center my-10">
        <div className="max-w-md w-full space-y-10">
          {/* Search Component Placeholder */}
          <div className="mt-10">
            <div className="relative">
              <select
                onChange={(item) => {
                  console.log(item.target.value);
                }}
                className="peer h-full w-full rounded-lg bg-transparent px-3 py-2 text-sm font-normal text-white outline-none border border-gray-700 focus:ring-2 focus:ring-gray-500"
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-3 -top-5 text-xs text-gray-400 transition-all peer-focus:-top-5 peer-focus:text-gray-200 peer-focus:text-xs">
                Item
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mx-4 my-12">
        {loaded ? (
          events.map((event, index) => (
            <Suspense fallback={<Loader />} key={index}>
              <div className="outline-1 outline p-2 border-white hover:outline-gray-600 delay-300 ease-linear hover:bg-white outline-gray-400 rounded-2xl m-4">
                <div className="outline-2 outline p-2 border-white outline-gray-400 bg-black rounded-2xl">
                  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                    <img
                      class="w-full h-fit"
                      src={event.imgurl}
                      alt="Sunset in the mountains"
                    />
                  </div>
                </div>
              </div>
            </Suspense>
          ))
        ) : (
          <div className="text-center">{/* Loader Placeholder */}</div>
        )}
      </div>
    </div>
  );
};

export default Cultural;
