import { auth } from "../config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account "
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const logout = () => getAuth().signOut();