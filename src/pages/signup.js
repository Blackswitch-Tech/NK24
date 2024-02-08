import React, { useState ,useEffect} from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Loader } from '../components/loader';
import firebase from "firebase/app";
import "firebase/auth";

import { db } from '../firebase/firebase'; // Adjust the path as necessary
import { collection, addDoc ,doc} from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const nav=useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
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

  if (!currentUser) {
    // Optionally, redirect or show a message instead
    return <div>Please sign in to access this page.</div>;
  }
  const SignupCode = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    try {
      // Add a new document in collection "users"
      let ids=doc(collection(db,"users")).id
      await addDoc(collection(db, "users"), {
        name: name,
        phoneNumber: phoneNumber,
        college: college,
        email:currentUser.email,
        branch: branch,
        semester: semester,
        registered:[],
        refcount:0,
        isCA:false,
        CACode:ids,
        NKID:`NK-${ids.substring(0,5).toUpperCase()}`
      });
      nav('/')
      // Reset form or redirect user as needed
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an issue registering the user.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('https://i.pinimg.com/736x/d9/46/d3/d946d33dc95c1b560b13cf8a78b801ba.jpg')] bg-no-repeat bg-cover bg-fixed bg-center">
      <div className="w-full max-w-md px-8 py-8 bg-transparent rounded-2xl shadow-lg">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white" className="text-center">
            Sign Up
          </Typography>
          <Typography color="white" className="mt-1 mb-4 font-normal text-center">
            Nice to meet you! Enter your details to register.
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
            <Checkbox
              label={
                <Typography variant="small" color="gray" className="flex items-center font-normal text-white mt-4">
                  I agree to the&nbsp;
                  <a href="#" className="font-medium transition-colors hover:text-gray-900">
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "mt-4" }}
              onChange={handleCheckboxChange} // Attach onChange handler
              checked={agreeToTerms} 
            />
            <Button className="mt-6" fullWidth disabled={!agreeToTerms} onClick={SignupCode}>
              Sign Up
            </Button>
            <Typography className="mt-4 text-center font-normal text-gray-50">
              Already have an account?{" "}
              <a href="#" className="font-medium text-gray-50 hover:text-red-600">
                Sign In
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
