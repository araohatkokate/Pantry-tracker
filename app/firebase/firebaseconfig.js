import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
 
// Your web app's Firebase configuration
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
const provider = new GoogleAuthProvider();
 
export { app, auth, firestore, provider, signInWithPopup, signOut };