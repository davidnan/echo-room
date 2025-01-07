// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY2-ZvEYJE3v3bM4FkmcrBBaSRq05cja0",
  authDomain: "echoroom-a7c85.firebaseapp.com",
  projectId: "echoroom-a7c85",
  storageBucket: "echoroom-a7c85.firebasestorage.app",
  messagingSenderId: "491733528095",
  appId: "1:491733528095:web:e0be2051a977b1cba06f2a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)