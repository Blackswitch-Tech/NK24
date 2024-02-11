import React, { useState, useEffect } from "react";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Loader } from "../components/loader"; // Ensure this path is correct
import { db } from "../firebase/firebase"; // Adjust the path as necessary
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(true); // Assuming users agreed to terms during signup
  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const nav = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        fetchUserData(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      setName(userData.name || "");
      setPhoneNumber(userData.phoneNumber || "");
      setCollege(userData.college || "");
      setBranch(userData.branch || "");
      setSemester(userData.semester || "");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "users", userDoc.id), {
          name,
          phoneNumber,
          college,
          branch,
          semester,
        });
        alert("Profile updated successfully!");
        nav("/"); // Redirect or handle as needed
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("There was an issue updating the profile.");
    }
  };

  if (loading) {
    return <Loader />; // Ensure your Loader component is correctly implemented
  }

  if (!currentUser) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('https://i.pinimg.com/736x/d9/46/d3/d946d33dc95c1b560b13cf8a78b801ba.jpg')] bg-no-repeat bg-cover bg-fixed bg-center">
      <div className="w-full max-w-md px-8 py-8 bg-transparent rounded-2xl shadow-lg">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white" className="text-center">
            Update Profile
          </Typography>
          <form onSubmit={updateProfile}>
            <div className="flex flex-col gap-4">
              {/* Name Input */}
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Name
                </Typography>
                <Input size="lg" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="text-white" />
              </div>
              {/* Phone Number Input */}
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Phone Number
                </Typography>
                <Input size="lg" placeholder="XXXXXXXXXX" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="text-white" />
              </div>
              {/* College Input */}
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  College
                </Typography>
                <Input size="lg" placeholder="Your College" value={college} onChange={(e) => setCollege(e.target.value)} className="text-white" />
              </div>
              {/* Branch Input */}
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Branch
                </Typography>
                <Input size="lg" placeholder="Your Branch" value={branch} onChange={(e) => setBranch(e.target.value)} className="text-white" />
              </div>
              {/* Semester Input */}
              <div>
                <Typography variant="h6" color="white" className="mb-2">
                  Semester
                </Typography>
                <Input size="lg" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="text-white" />
              </div>
              {/* Terms and Conditions */}
              <Checkbox label={<Typography variant="small" color="gray" className="flex items-center font-normal text-white">I agree to the Terms and Conditions</Typography>} containerProps={{ className: "mt-4" }} checked={agreeToTerms} onChange={handleCheckboxChange} />
              <Button className="mt-6" fullWidth disabled={!agreeToTerms} onClick={updateProfile}>Update Profile</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateProfile;
