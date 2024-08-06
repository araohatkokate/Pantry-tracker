// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa5qCsdLLZTYdAYwjLuKPR35jY_0rPipQ",
  authDomain: "pantry-tracker-7bb35.firebaseapp.com",
  projectId: "pantry-tracker-7bb35",
  storageBucket: "pantry-tracker-7bb35.appspot.com",
  messagingSenderId: "460011347116",
  appId: "1:460011347116:web:8131401c81e0d5569a9309",
  measurementId: "G-7XK2TYRRH5"
};
 
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
 
export {app, auth, GoogleAuthProvider, signInWithPopup, signOut, firestore};