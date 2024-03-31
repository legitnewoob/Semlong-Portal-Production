// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,  GoogleAuthProvider , onAuthStateChanged} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSG1OZ052kvjGfdW56GwPFX4-QVTku_vA",
  authDomain: "semlong-internship.firebaseapp.com",
  projectId: "semlong-internship",
  storageBucket: "semlong-internship.appspot.com",
  messagingSenderId: "105113753125",
  appId: "1:105113753125:web:6e4d2a58f7cc84781d51cc",
  measurementId: "G-BENNF25QC8"
};  

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// googleProvider.setCustomParameters({   
//   prompt: "select_account",
//   hd: "somaiya.edu",
//   login_hint: "your_email@somaiya.edu",
// });



export const db = getFirestore(app);
