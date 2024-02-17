// src/components/EventPage.js
import React, { useEffect, useState } from "react";
import { MdPhone } from "react-icons/md";
import { MdOutlineEmojiEvents as TrophyIcon } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { useParams } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore/lite";
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
  Checkbox,
} from "@material-tailwind/react";

import { displayRazorpay } from "../razorpay/razorpay";

const EventPage = () => {
  const [eventData, setEventData] = useState(null);
  const { id } = useParams();

  const [newMemberName, setNewMemberName] = useState("");

  const [registering, setRegistering] = useState(false);
  const [refCode, setRefcode] = useState(null);
  const [team, setTeam] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [needSignUp, setNeedSignUp] = useState(true);
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const ref = localStorage.getItem("refcode");
    if (ref !== "undefined") setRefcode(ref);

    const fetchEventData = async () => {
      const q = query(collection(db, "events"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        setEventData(docData);
      } else {
        alert("No such event!");
      }
    };

    fetchEventData();
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Hide loader once the auth state is determined
    });

    if (currentUser) {
      getUserByEmail(currentUser.email).then((data) => {
        if (data) {
          console.log(data.name);
          setTeam([...team, data.name]);
          setNeedSignUp(false);
        } else {
          setNeedSignUp(true);
        }
      });
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [id, currentUser]);

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
      .catch((error) => {});
  };
  const proceedToPay = async () => {
    if (agreeToTerms === true) {
      if (
        (team.length >= Number(eventData.min) &&
          team.length <= Number(eventData.max)) ||
        eventData.type.toLowerCase() === "single"
      ) {
        getUserByEmail(currentUser.email).then((userData) => {
          const token = {
            uid: userData.id,
            nkid: userData.NKID,
            email: userData.email,
            username: userData.name,
            amount: eventData.regfee * 100,
            eventid: eventData.id,
            eventname: eventData.name,
            phone: userData.phoneNumber,
            ref: refCode ? refCode : "nor",
            team:
              eventData.type.trim().toLowerCase() === "team"
                ? team.toString()
                : null,
          };
          setRegistering(true);
          displayRazorpay(token, nav, window.location.pathname);
        });
      } else {
        alert(
          ` number of participants are required between ${eventData.min} and ${eventData.max}`
        );
      }
    } else {
      alert("Read the rules and regulations");
    }
  };

  const handleRefCodeChange = (event) => {
    setRefcode(event.target.value);
  };

  const addTeamMember = () => {
    console.log(team);
    if (newMemberName.trim()) {
      setTeam([...team, newMemberName.trim()]);
      setNewMemberName("");
    }
  };

  const handleChange = () => {
    if (agreeToTerms) setAgreeToTerms(false);
    else setAgreeToTerms(true);
  };

  const deleteTeamMember = (index) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  if (!eventData)
    return (
      <div class="text-center h-screen">
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
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mt-24">
        {/* Image Container */}
        <div className="flex-1">
          <img
            className="w-full h-auto rounded-lg"
            src={
              eventData.imgurl
                ? eventData.imgurl
                : "https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/comingsoon.jpeg?alt=media&token=db8b5064-054e-45b9-9dc6-393ac6ebc840"
            }
            alt="Event Poster"
          />
        </div>

        {/* Data Container */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl text-white font-pop font-bold text-center mb-4">
            {eventData.name}
          </h1>
          <p className="text-lg mb-4 font-pop text-white ">
            {eventData.description}
          </p>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white font-pop mb-2 underline">
              Details
            </h2>
            <p className="mb-1 font-pop text-white">
              Date:{" "}
              <span className="font-medium font-pop text-white ">
                {eventData.date}
              </span>
            </p>
            <p className="mb-1 font-pop text-white">
              Time:{" "}
              <span className="font-medium font-pop  text-white">
                {eventData.time}
              </span>
            </p>
            <p className="font-pop text-white">
              Category:{" "}
              <span className="font-medium font-pop text-white">
                {eventData.cat} - {eventData.subcat}
              </span>
            </p>
            <p className="font-pop text-white">
              Minimum participants:{" "}
              <span className="font-medium text-white font-pop">
                {eventData.min}
              </span>
            </p>
            <p className="font-pop text-white">
              Maximum participants:{" "}
              <span className="font-medium text-white font-pop">
                {eventData.max}
              </span>
            </p>
            <p className="font-pop text-2xl text-white">
              registration fees:{" "}
              <span className=" font-extrabold font-pop text-white">
                Rs.{eventData.regfee}
              </span>
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl text-white font-semibold mb-2 font-pop underline">
              Organizers
            </h2>
            {eventData.people.map((person, index) => (
              <div key={index} className="mb-2">
                <p>
                  <span className="font-medium font-pop text-white">
                    {person.title} : {person.name},{" "}
                    <MdPhone className="inline text-white" /> {person.phno}
                  </span>
                </p>
              </div>
            ))}
          </div>
          {eventData.subcat.toLowerCase().trim()==="Workshop" &&(
          <div className="mb-6">
            <h2 className="text-2xl font-semibold font-pop text-white mb-2 underline">
              Prizes
            </h2>
            {eventData.prizes.map((prize, index) => (
              <div key={index} className="mb-2">
                <div className="font-medium font-pop text-white">
                  {prize.title === "1st" && (
                    <TrophyIcon className="text-yellow-500 inline" size={32} />
                  )}
                  {prize.title === "2nd" && (
                    <TrophyIcon className="text-gray-400 inline" size={32} />
                  )}
                  {prize.title === "3rd" && (
                    <TrophyIcon className="text-orange-400 inline" size={32} />
                  )}
                  {(prize.title !== "1st" &&
                    prize.title !== "2nd" &&
                    prize.title !== "3rd") ||
                    "  "}
                  {prize.amt}
                </div>
              </div>
            ))}
          </div>

          )}

          <div className="mb-1 font-pop text-green-500 text-2xl">
            Slots left:{" "}
            {eventData.id !== "NK-45" ? (
              <span className="font-medium font-pop ">
                {eventData.slots_left}
              </span>
            ) : (
              <span className="font-medium font-pop ">Unlimited.</span>
            )}
          </div>
          <div>
            <Button
              className=" hover:bg-green-500 py-4 px-2 font-pop"
              onClick={handleOpen}
            >
              View Rules
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-black-200">
              <DialogHeader className="font-pop text-white">
                Event Rules
              </DialogHeader>
              <DialogBody className="h-[25rem] overflow-scroll">
                <Typography className="font-normal">
                  <ul className="list-disc pl-5">
                    {eventData.rules.map((rule, index) => (
                      <li key={index} className="text-white font-pop ">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button
                  className="font-pop text-white hover:bg-green-400"
                  variant="text"
                  color="blue-gray"
                  onClick={handleOpen}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </Dialog>
          </div>

          {/* Conditional Rendering based on slots_left */}
          {eventData.slots_left > 0 || eventData.id === "NK-45" ? (
            <div>
              <h2 className="text-2xl font-semibold text-white font-pop mb-2 underline">
                Register
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                {currentUser ? (
                  <>
                    {needSignUp ? (
                      <>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 font-pop  w-full sm:w-72 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            nav(`/signup?redirect=/events/cultural/${id}`);
                          }}
                        >
                          SignUp to register
                        </button>
                      </>
                    ) : eventData.id === "NK-45" ? (
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 font-pop  w-full  sm:w-72 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            nav("/dashboard");
                          }}
                        >
                         Go to dashboard
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {eventData &&
                          eventData.type.trim().toLowerCase() == "team" && (
                            <div className="mt-5 flex flex-col  justify-center mx-0 gap-3">
                              <div className="w-full text-left">
                                <h1 className="font-pop text-white">
                                  Add team member
                                </h1>
                              </div>
                              <div className="flex gap-2 ">
                                <input
                                  type="text"
                                  value={newMemberName}
                                  onChange={(e) =>
                                    setNewMemberName(e.target.value)
                                  }
                                  className="text-black-500 font-pop  px-4  w-full py-3 sm:w-72 rounded"
                                  placeholder="Enter team member's name"
                                />
                                <button
                                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={addTeamMember}
                                >
                                  <AiOutlinePlus />
                                </button>
                              </div>
                              <div className="w-full flex flex-col items-start gap-2">
                                {" "}
                                {/* Adjust for alignment */}
                                {team.map((member, index) => (
                                  <>
                                    <div
                                      key={index}
                                      className="flex items-center justify-start gap-4 w-full"
                                    >
                                      <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => deleteTeamMember(index)}
                                      >
                                        <AiOutlineMinus />
                                      </button>

                                      <div className="text-xl font-pop text-white flex-1">
                                        {member}
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                          )}

                        <div className="w-full flex flex-col  justify-center gap-6">
                          <div className="font-pop text-white mt-7">
                            REFERRAL CODE
                          </div>
                          <div className="flex w-72 flex-col gap-6  w-full py-3 sm:w-72">
                            <input
                              type="text"
                              value={refCode}
                              onChange={handleRefCodeChange}
                              className="text-black-500 font-pop px-4 rounded  w-full py-3 sm:w-72"
                              placeholder="Enter referral code"
                            />
                          </div>
                        </div>
                        <Checkbox
                          label={
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex  font-normal font-pop text-white mt-4"
                            >
                              I have read the rules and regulations
                            </Typography>
                          }
                          containerProps={{ className: "mt-4" }}
                          onChange={handleChange}
                          checked={agreeToTerms}
                        />
                        {registering ? (
                          <>
                            <div
                              class=" border border-red-400 text-red-700 px-4 py-3 rounded relative"
                              role="alert"
                            >
                              <strong class="font-bold font-pop">
                                Disclaimer:
                              </strong>
                              <span class="block sm:inline text-xs font-pop">
                                {" "}
                                If your account is debited but the transaction
                                does not appear in your registration status,
                                please{" "}
                                <a
                                  className="underline text-red-200"
                                  href="/contact_us"
                                >
                                  Contact Us
                                </a>{" "}
                                before attempting another payment.
                              </span>
                            </div>
                            <div
                              class=" border border-red-400 text-red-700 px-4 py-3 rounded relative"
                              role="alert"
                            >
                              <strong class="font-bold font-pop">
                                Disclaimer:
                              </strong>
                              <span class="block sm:inline text-xs font-pop">
                                {" "}
                                If you have manually closed and open the
                                Nakshatra webiste during payment, there is some
                                chance that nothin happens, if so do to{" "}
                                <a
                                  className="underline text-red-200"
                                  href="/dashboard"
                                >
                                  dashboard
                                </a>{" "}
                                before attempting another payment or contacting.
                              </span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        <button
                          className="bg-blue-500 mt-5 hover:bg-blue-700 font-pop w-full py-3 sm:w-72 text-white font-bold py-2 px-4 rounded "
                          disabled={registering}
                          onClick={() => {
                            proceedToPay();
                          }}
                        >
                          {registering
                            ? "Registering, May take time .."
                            : `Register and Pay Rs: ${eventData.regfee}`}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-pop font-bold py-2 px-4 rounded"
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
          ) : (
            <div className="font-pop text-2xl text-red-500 ">
              REGISTRATION CLOSED, NO SLOTS LEFT.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
