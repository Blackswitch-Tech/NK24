import { useState, useEffect } from "react";
import "./dashstyle.css";
import { Button } from "@material-tailwind/react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebase/firebase";
import { FaWhatsapp } from "react-icons/fa";

export default function Dash() {
  const [isCampusAmbassador, setCampusAmbassador] = useState(false);
  const [amboId, setAmboId] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        const userDocSnapshot = querySnapshot.docs[0];
        const isAmbassador = userDocSnapshot.data().isCA;
        const id = userDocSnapshot.data().CACode;
        console.log(isAmbassador);
        console.log(amboId);
        setCampusAmbassador(isAmbassador);
        setAmboId(id);
      } catch (error) {
        console.log("error");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = () => {
    nav("/update_profile", { state: { update: true } });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        nav("/");
      })
      .catch((error) => {});
  };

  const caRegister = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(q);
      const userDocSnapshot = querySnapshot.docs[0];
      const userDocRef = userDocSnapshot.ref;

      await updateDoc(userDocRef, {
        isCA: true,
      });
      setCampusAmbassador(true);
    } catch (error) {
      console.error("Error in caRegister:", error);
    }
  };

  //whatsapp evide
  const shareText = `Dive into the Ciniverse Extravaganza at Nakshatra 2024! 🌌✨ Experience the ultimate blend of technology and culture, where the magic of cinema meets the future of innovation. Don't miss this epic fest! Join us: ${window.location.origin}?refocde=${amboId} #Nakshatra2024 #CiniverseExtravaganza`;
  const encodedShareText = encodeURIComponent(shareText);
  const whatsappLink = `https://wa.me/?text=${encodedShareText}`;

  return (
    <div className=" min-h-screen  flex flex-col items-center justify-center bg-[url('https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Signupbg.jpeg?alt=media&token=94bfbc88-78f6-4c8a-a749-19fcb76fe493')] bg-no-repeat bg-cover bg-fixed bg-center">
      <div className="container mx-auto px-4 lg:px-8 mt-20 ">
        {/* Container with horizontal padding, adjustable for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div
            className=" p-12 shadow-2xl flex flex-col justify-between  rounded-xl min-h-[300px] w-full"
            style={{ backgroundColor: "rgb(22, 23, 27)" }}
          >
            <div className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold font-pop text-white">
              Welcome,{" "}
              {currentUser
                ? currentUser.displayName || "User"
                : "No user logged in"}
            </div>

            <div className="text-20 font-pop mt-2">
              This is the dashboard. You can view the events you have registered
              here and update your current profile
            </div>
            <Button
              onClick={handleUpdate}
              className="mt-20 lg:w-1/2 font-pop text-xl text-blue-900 hover:bg-white"
            >
              Update Profile
            </Button>
            <Button
              onClick={handleSignOut}
              className="mt-5 lg:w-1/2 font-pop text-xl text-red-800 hover:bg-white"
            >
              LOGOUT
            </Button>
          </div>

          <div
            className="bg-white p-12 shadow-xl flex flex-col rounded-xl min-h-[300px] w-full"
            style={{ backgroundColor: "rgb(22, 23, 27)" }}
          >
            <div className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold font-pop text-white">
              Campus Ambassador
            </div>
            <div className="text-20 font-pop mt-5">
              Have you dreamed of being a superhero ? Who needs superheroes when
              you can be a campus ambassador. “With great power comes great
              responsibility”. Here’s an opportunity to explore your inner
              influencer. Let’s see who will become the next face of Nakshatra
            </div>

            <div>
              {isCampusAmbassador === false ? (
                <Button
                  onClick={caRegister}
                  className="text-green-600 lg:w-1/2 text-xl mt-20 font-pop hover:bg-white"
                >
                  Register as Ambassador
                </Button>
              ) : (
                <>
                  <div className="text-3xl mt-5 sm:text-xl md:text-2xl lg:text-3xl font-bold font-pop text-white">
                    You are Registered!
                  </div>
                  <div className="text-lg sm:text-lg md:text-2xl lg:text-3xl font-bold font-pop  text-green-500">
                    id: {amboId}
                  </div>
                  <a
                    href={whatsappLink}
                    className="mt-5 inline-flex items-center justify-center bg-green-600 text-white font-bold font-pop py-2 px-4 rounded hover:bg-green-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="mr-2" /> Share
                  </a>
                </>
              )}
            </div>
          </div>
          <div
            className="bg-white p-12 shadow-xl rounded-xl md:col-span-2 min-h-[300px] w-full"
            style={{
              backgroundColor: "rgb(22, 23, 27)",
            }} /*style={{ animation: 'gradientAnimation 3s ease infinite', backgroundSize: '200% 200%' }}*/
          >
            <div className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold font-pop text-white">
              Registered Events
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
