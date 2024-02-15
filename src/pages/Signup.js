import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Loader } from "../components/Loader";
import "firebase/auth";

import { db } from "../firebase/firebase"; // Adjust the path as necessary
import { collection, addDoc, doc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Signup = ({route}) => {

  const [name, setName] = useState("");
  const nav = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Hide loader once the auth state is determined
    });
  

    // Cleanup subscription on unmount
    return () => unsubscribe();
   
  }, []);
  if (loading) {
    return <Loader />; // Render your loader component here
  }
  console.log(route)
  if (!currentUser) {
    // Optionally, redirect or show a message instead
    return <div>Please sign in to access this page.</div>;
  }
  const SignupCode = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if(name.trim() === '' || phoneNumber.trim() === '' || college.trim() === '' || branch.trim() === '' || semester.trim() === '')
       alert("fill the form completely");
    else
    {

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    try {
      // Add a new document in collection "users"
      
        let ids = doc(collection(db, "users")).id;
        console.log(ids)
        await addDoc(collection(db, "users"), {
          name: name,
          phoneNumber: phoneNumber,
          college: college,
          email: currentUser.email,
          branch: branch,
          semester: semester,
          registered: [],
          refcount: 0,
          isCA: false,
          CACode: ids,
          NKID: `NK-${ids.substring(0, 5).toUpperCase()}`,
      });
    
      if(location.search.split('=')[1])
      {
        nav(location.search.split('=')[1]);
      }
      else {
        nav("/");
      }
    
      // Reset form or redirect user as needed
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an issue registering the user.");
    }
  }
  };
  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Signupbg.jpeg?alt=media&token=94bfbc88-78f6-4c8a-a749-19fcb76fe493')] bg-no-repeat bg-cover bg-fixed bg-center">
    <div className="w-full max-w-md px-8 py-8 bg-transparent rounded-2xl mt-16 shadow-lg">
        <Card color="transparent" shadow={false}>
       
                
                 <Typography variant="h4" color="white" className="text-center"> Sign up</Typography>

              <Typography color="white" className="mt-1 mb-4 font-normal text-center">
              
             
                
                <Typography color="white" className="mt-1 mb-4 font-normal text-center"> Nice to meet you! Enter your details</Typography>
                </Typography>
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-white"
                />
              </div>
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Phone Number
                </Typography>
                <Input
                  size="lg"
                  placeholder="XXXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-white"
                />
              </div>
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  College
                </Typography>
                <Input
                  size="lg"
                  placeholder="SAINTGITS College Of Engineering"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="text-white"
                />
              </div>
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Branch
                </Typography>
                <Input
                  size="lg"
                  placeholder="Computer Science"
                  value={branch}
               
                  onChange={(e) => setBranch(e.target.value)}
                  className="text-white"
                />
              </div>
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Semester
                </Typography>
                <Input
                  size="lg"
                  placeholder="VI"
                  value={semester}
             
                  onChange={(e) => setSemester(e.target.value)}
                  className="text-white"
                />
              </div>
            </div>
           
       <>
      <Checkbox
        label={
          <Typography
            variant="small"
            color="gray"
            className="flex items-center font-normal font-pop text-white mt-4">
            I agree to the&nbsp;
            <a href="#" className="font-medium font-pop transition-colors hover:text-gray-900">
              Terms and Conditions
            </a>
          </Typography>
        }
        containerProps={{ className: "mt-4" }}
        onChange={handleCheckboxChange}
        checked={agreeToTerms}
      />
      <Button
        className="mt-6 hover:bg-green-500"
        type="submit"
        fullWidth
        disabled={!agreeToTerms}
        onClick={SignupCode}
      >
        Sign Up
      </Button>
    </>

              </form>
            </Card>
          </div>
        </div>
      );
}

export default Signup;
