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
    <div className="bg-cover bg-fixed  bg-no-repeat  h-fit lg:h-svh bg-gradient-to-b from-gray-900 to-black w-full">
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
      <div className="flex flex-col sm:flex-row mx-10 justify-evenly flex-wrap mt-12">
        {loaded ? (
          <>
            {events.map((event) => (
              <Suspense fallback={<Loader />}>
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
            ))}
          </>
        ) : (
          <>
            <div className="h-svh">
              <div class="text-center">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cultural;
