import { db } from '../firebase/firebase'; // Adjust the path as necessary
import { collection, query, where, getDocs } from 'firebase/firestore/lite';

export const getUserByEmail = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      const userData = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userData.push({ id: doc.id, ...doc.data() });
      });
      if (userData.length > 0) {
        return userData[0]; // Assuming email is unique and only one document will be found
      } else {
        //Alert No such document!
        return null; // No user found
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      return null; // Return null or handle error as needed
    }
  };