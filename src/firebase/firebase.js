// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsSfJbJUxNflxSvGXS1Uzkv7ZU5jv0P8M",
  authDomain: "nakshatra-9c45c.firebaseapp.com",
  projectId: "nakshatra-9c45c",
  storageBucket: "nakshatra-9c45c.appspot.com",
  messagingSenderId: "203297675242",
  appId: "1:203297675242:web:c8cbef31c9890871324493",
  measurementId: "G-8MQPTG1Y07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export { db };
const analytics = getAnalytics(app);