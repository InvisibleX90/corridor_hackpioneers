// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArh0AUCGZymBKsHORe6-GeyaoWYz2_aok",
  authDomain: "admin-coridor.firebaseapp.com",
  projectId: "admin-coridor",
  storageBucket: "admin-coridor.appspot.com",
  messagingSenderId: "670918398866",
  appId: "1:670918398866:web:1d55b6d63619488726674b",
  measurementId: "G-NDNZ5625YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
