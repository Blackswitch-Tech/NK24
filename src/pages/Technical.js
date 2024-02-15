import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";

const Technical = () => {
  
  const nav = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [curEvents,setCurEvents]=useState([]);
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
        setEvents(newData.filter((event) => event.cat === "Technical" || event.cat === "technical"));
        setCurEvents(newData.filter((event) => event.cat === "Technical" || event.cat === "technical"));
        setTimeout(() => setLoaded(true), 1000);
      });
    };
    getData();
  }, []);

  const handleChangeCategory = (category) => {
    if(category==="All"){
      setCurEvents(events);
    }
    else {
      setCurEvents(events.filter((event) => event.subcat === category));
    }
  }
  return (
    <div className="bg-cover bg-fixed bg-no-repeat h-auto min-h-screen bg-[url('https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Signupbg.jpeg?alt=media&token=94bfbc88-78f6-4c8a-a749-19fcb76fe493')] w-full px-5">
      <div className="flex justify-center items-center pt-32">
        <h1 className="text-white text-6xl font-pop sm:text-7xl tracking-widest">
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
                className="peer h-full w-full rounded-lg bg-transparent px-3 py-2 text-sm font-normal text-white outline-none border border-gray-700 focus:ring-2 focus:ring-gray-500"
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-3 -top-5 text-xs font-pop text-gray-400 transition-all peer-focus:-top-5 peer-focus:text-gray-200 peer-focus:text-xs">
                Item
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 my-12">
        {loaded ? (
          curEvents.map((event, index) => (
            
      
              <div className="hover:scale-110 transition duration-200 cursor-pointer rounded-2xl m-4" onClick={() => nav(`/events/cultural/${event.id}`)}>
                  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                    <img
                      className="w-full object-cover  h-120"
                      src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
                      alt={event.id}
                    />
                  </div>
                 
              </div>
           
             
            
          ))
        ) : (
          <div className="text-center">{/* Loader Placeholder */}</div>
        )}
      </div>
    </div>
  );
};

export default Technical;
