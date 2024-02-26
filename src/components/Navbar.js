import { useState,useEffect } from "react";
import { Disclosure, Menu} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getUserByEmail} from "../utils/searchbyEmail";
import NK24logo from '../assets/NK24logo.webp';
import { MdMenu,MdClose,MdLogin,MdPerson } from 'react-icons/md';
import "./styles.css"


const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Events", href: "/events", current: false },
  { name: "Feedback", href: "/Feedback", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const nav=useNavigate();
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  // icon import
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
       // Hide loader once the auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  const handleSignIn=()=>{
    
    if (!auth.currentUser) {
      signInWithPopup(auth, provider).then((res) => {
        getUserByEmail(res.user.email).then((userData) => {
          if (userData) {
            nav('/dashboard');
          } else {
            nav('/signup');
          }
        }).catch((error) => {
          console.error("Error fetching user data: ", error.message);
        });
      }).catch((error) => {
        console.error("Error during sign in: ", error.message);
      });
    } else {
      getUserByEmail(auth.currentUser.email).then((userData) => {
        if (userData) {
          nav('/dashboard');
        } else {
          nav('/signup');
        }
      }).catch((error) => {
        console.error("Error fetching user data: ", error.message);
      });
    }
  }
  return (
    <Disclosure as="nav" className="bg-transsparent fixed  w-full backdrop-filter backdrop-blur-lg bg-opacity-30 z-10 pb-3 lg:pb-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full pt-5 sm:p-6 lg:px-8">
            <div className="relative flex h-8 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (

                    <MdClose className="block h-6 w-6 text-white" size={20} aria-hidden="true" />
                  ) : (
                    
                    <MdMenu className="block h-6 w-6 text-white  " aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-20 w-20 sm:h-24 sm:w-24 "
                    src={NK24logo}
                    alt="NK24Logo"
                    onClick={() => nav("/")}
                  />
                </div>
                <div className="hidden sm:ml-5 sm:block p-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",

                          "rounded-md px-3 py-2 text-xl font-pop"

                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {
                currentUser ? <>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex  " onClick={handleSignIn}>
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <MdPerson className="block h-10 w-10 text-white" size={20} aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  
                </Menu>
              </div>
                </> : <>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex  " onClick={()=>{handleSignIn()}}>
                      <span className="-inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <MdLogin className="block h-6 w-6 text-white" size={20} aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  
                </Menu>
              </div>
                </>
              }
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 ",
                    "block rounded-md px-3 py-2 text-base font-medium font-pop text-white"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
