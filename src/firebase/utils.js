import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./firebase";

export const signInWithGoogle = () => {

  signInWithPopup(auth,provider).then((res) => {
    return(true)
  }).catch((error) => {
    console.log(error.message)
  })
}
