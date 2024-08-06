// auth.js
import { auth, GoogleAuthProvider, signInWithPopup, signOut } from "@/app/firebase/firebaseconfig";
 
const provider = new GoogleAuthProvider();
 
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    console.log('User signed in: ', user);
  } catch (error) {
    console.error('Error during sign in: ', error.message);
  }
};
 
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error during sign out: ', error.message);
  }
};