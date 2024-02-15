import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export const signInWithGoogle = () => {

  signInWithPopup(auth,provider).then((res) => {
    return(true)
  }).catch((error) => {
    //Add alert about Error Type
  })
}
