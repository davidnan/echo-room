// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoEN4T9i6NwjAvTTbIiVc0MGlnqkGyG7g",
  authDomain: "echo-room-auth.firebaseapp.com",
  projectId: "echo-room-auth",
  storageBucket: "echo-room-auth.firebasestorage.app",
  messagingSenderId: "820188746229",
  appId: "1:820188746229:web:121daedd7df7a8a6fd10bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)