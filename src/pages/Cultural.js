import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore/lite";

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
        if(events.length > 0) setLoaded(true);
        console.log(events);
      });
    };
    getData();
  },[]);

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-black">
      <div className="justify-center align-middle flex">
        <h1 className="text-white font-neu text-6xl sm:text-7xl mt-32 tracking-widest">
          Cultural Events
        </h1>
      </div>
      <div className="flex flex-row justify-center mx-10">
        <div class="max-w-md mx-auto w-full mt-10">
          {/*<div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
  
              <input
                class="peer h-full w-full outline-none text-sm text-black pr-2 placeholder:text-black"
                type="text"
                id="search"
                placeholder="Search Events"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>*/}
          <div className="mt-10">
            <div class="relative h-10">
              <select
                onChange={(item) => {
                  console.log(item.target.value);
                }}
                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Item
              </label>
            </div>
          </div>
        </div>

        
      </div>
      <div className="flex flex-col sm:flex-row mx-10 justify-evenly flex-wrap">{loaded ? <>
          {events.map((event) => (
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <img
                class="w-full"
                src={event.imgurl}
                alt="Sunset in the mountains"
              />
              
              
            </div>
          ))}
        </> : <>
        
        
        </>}</div>
    </div>
  );
};

export default Cultural;
