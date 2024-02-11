// src/components/EventPage.js
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
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
  const [refCode, setRefcode] = useState(null);
  const [team, setTeam] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData,setUserData] = useState(null);
  const [needSignUp, setNeedSignUp] = useState(true);
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchEventData = async () => {
      const q = query(collection(db, "events"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming 'id' is unique, there should only be one document.
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
    })}


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
          <h1 className="text-3xl font-bold text-center mb-4">
            {eventData.name}
          </h1>
          <p className="text-lg mb-4">{eventData.description}</p>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Details</h2>
            <p className="mb-1">
              Date: <span className="font-medium">{eventData.date}</span>
            </p>
            <p className="mb-1">
              Time: <span className="font-medium">{eventData.time}</span>
            </p>
            <p>
              Category:{" "}
              <span className="font-medium">
                {eventData.cat} - {eventData.subcat}
              </span>
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Participants</h2>
            {eventData.people.map((person, index) => (
              <div key={index} className="mb-2">
                <p>
                  <span className="font-medium">
                    {person.title} : {person.name}, ☎️ {person.phno}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Prizes</h2>
            {eventData.prizes.map((prize, index) => (
              <div key={index} className="mb-2">
                <p>
                  <span className="font-medium">
                    {prize.title === "1st"
                      ? "🥇"
                      : prize.title === "2nd"
                      ? "🥈"
                      : prize.title === "3rd"
                      ? "🥉"
                      : prize.title}{" "}
                    : {prize.amt}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Rules</h2>
            <Button onClick={handleOpen}>View Rules</Button>
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
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Register</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {currentUser ? (
                <>
                  {needSignUp ? (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          nav(`/signup?redirect=/events/cultural/${id}`);
                        }}
                      >
                        SignUp to register
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          proceedToPay()
                        }}
                      >
                        Regsiter
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
