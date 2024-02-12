// src/components/EventPage.js
import React, { useEffect, useState } from "react";
import { MdPhone } from 'react-icons/md'
import { MdOutlineEmojiEvents as TrophyIcon } from 'react-icons/md';
import { Input } from "@material-tailwind/react";

import { redirect, useParams } from "react-router-dom";
import { Dialogbox, LongDialog } from '../components/Dialogbox';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore/lite";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserByEmail } from "../utils/searchbyEmail";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import SignInComponent from "./Signup";
import { displayRazorpay } from "../razorpay/razorpay";

const EventPage = () => {
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();
  const [count,setCount] = useState(0);
  const [refCode, setRefcode] = useState(null);
  const [min,setMin] = useState(null);
  const [max,setMax] = useState(null);
  const [team, setTeam] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData,setUserData] = useState(null);
  const [needSignUp, setNeedSignUp] = useState(true);
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const ref = localStorage.getItem("refcode");
    if(ref!=="undefined")
      setRefcode(ref)

    const fetchEventData = async () => {
      const q = query(collection(db, "events"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
  
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

         
        setEventData(docData);

      } else {
        console.log("No such event!");
      }
    };

    fetchEventData();
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Hide loader once the auth state is determined
    });
    
    if (currentUser) {
      console.log(currentUser);
      getUserByEmail(currentUser.email).then((data) => {

        if (data) {
          setNeedSignUp(false);
        } else {
          setNeedSignUp(true);
        
        }
      });
    }
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [id,currentUser]);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        getUserByEmail(res.user.email).then((userData) => {
          if (userData) {
            // Proceed with user data
          } else {
            nav(`/signup?redirect=/events/cultural/${id}`);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const proceedToPay = async () => {
        if((count > eventData.min && count < eventData.max)||eventData.type === "single"||eventData.type === "Single")
        {
          getUserByEmail(currentUser.email).then((userData) => {
            const token = {

              uid: userData.id,
              nkid:userData.NKID,
              username: userData.name,
              amount: eventData.regfee,
              eventid: eventData.id,
              eventname: eventData.name,
              
            
            };
            displayRazorpay(token)
        })
        }
        else
        {
          alert(`number of participants are required between ${eventData.min} and ${eventData.max}`)
        }
    
}

const handleRefCodeChange = (event) => {
  setRefcode(event.target.value);
};




  if (!eventData) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mt-24">
        {/* Image Container */}
        <div className="flex-1">
          <img
            className="w-full h-auto rounded-lg"
            src={eventData.imgurl}
            alt="Event Poster"
          />
        </div>

        {/* Data Container */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl text-white font-pop font-bold text-center mb-4">
            {eventData.name}
          </h1>
          <p className="text-lg mb-4 font-pop">{eventData.description}</p>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white font-pop mb-2">Details</h2>
            <p className="mb-1 font-pop">
              Date: <span className="font-medium font-pop">{eventData.date}</span>
            </p>
            <p className="mb-1 font-pop">
              Time: <span className="font-medium font-pop">{eventData.time}</span>
            </p>
            <p className="font-pop">
              Category:{" "}
              <span className="font-medium font-pop">
                {eventData.cat} - {eventData.subcat}
              </span>
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl text-white font-semibold mb-2 font-pop">Organizers</h2>
            {eventData.people.map((person, index) => (
              <div key={index} className="mb-2">
                <p>
                  <span className="font-medium font-pop">
                    {person.title} : {person.name}, <MdPhone className="inline text-white"/> {person.phno}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibol font-pop text-white mb-2">Prizes</h2>
            {eventData.prizes.map((prize, index) => (
              <div key={index} className="mb-2">
                <p>
                          <span className="font-medium font-pop">
              {prize.title === "1st" && <TrophyIcon className="text-yellow-500 inline" size={32} />}
              {prize.title === "2nd" && <TrophyIcon className="text-gray-400 inline" size={32} />}
              {prize.title === "3rd" && <TrophyIcon className="text-orange-400 inline" size={32} />}
              {prize.title !== "1st" && prize.title !== "2nd" && prize.title !== "3rd" && prize.title}{" "}
               {prize.amt}
            </span>
                          </p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white font-pop mb-2">Rules</h2>
            <Button className=" hover:bg-green-500 py-4 px-2 font-pop" onClick={handleOpen}>View Rules</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Event Rules</DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
          <Typography className="font-normal">
          <ul className="list-disc pl-5">
              {eventData.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button className="font-pop" variant="text" color="blue-gray" onClick={handleOpen}>
            Cancel
          </Button>
          <Button className="font-pop" variant="gradient" color="green" onClick={handleOpen}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white font-pop mb-2">Click to Register</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {currentUser ? (
                <>
                  {needSignUp ? (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 font-pop text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          nav(`/signup?redirect=/events/cultural/${id}`);
                        }}
                      >
                        SignUp to register
                      </button>
                    </>
                  ) : (
                    <>
                    {
                  eventData && eventData.type === "team" && (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                        onClick={() => setCount(count + 1)}
                      >
                        Increase
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                        onClick={() => setCount((prevCount) => prevCount > 0 ? prevCount - 1 : 0)}
                      >
                        Decrease
                      </button>
                      <h1>{count}</h1>
                   </>

                  )
                }

                                 <div>
                                    <div className="font-pop text-white">REFERRAL CODE</div>
                                    <div className="flex w-72 flex-col gap-6">
                                      <input 
                                        type="text"
                                        color="blue" 
                                        value={refCode}
                                        onChange={handleRefCodeChange} 
                                        readOnly={!!refCode} 
                                        className="input-class" 
                                      />
                                    </div>
                                  </div>
                                        
                                        
                      <button
                        className="bg-blue-500 hover:bg-blue-700 font-pop text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          proceedToPay()
                        
                        }}
                      >
                        REGISTER
                      </button>
                    </>
                  )}

                      
                </>
              ) : (
                <>
                  
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      handleSignIn();
                    }}
                  >
                    Sign In to Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
