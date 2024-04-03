// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,  GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Add your own firebase config

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// googleProvider.setCustomParameters({   
//   prompt: "select_account",
//   hd: "somaiya.edu",
//   login_hint: "your_email@somaiya.edu",
// });



export const db = getFirestore(app);
