import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        return userCredential.user; // Returns the authenticated user
    } catch (err) {
        throw err;
    }
};

export const createAccount = async (username, email, password) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: username
        });
        console.log(userCredential);
        return userCredential.user;
    }
    catch(err){
       throw err;
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        throw err;
    }
};

