// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM0-uNGlTO-UmD1i8ZtcGt5zS5EEe3o6E",
  authDomain: "swaasth-bazar.firebaseapp.com",
  projectId: "swaasth-bazar",
  storageBucket: "swaasth-bazar.appspot.com",
  messagingSenderId: "322172409700",
  appId: "1:322172409700:web:9efe6fdcd3ec95c1d44c71",
  measurementId: "G-WJZM7J6YT0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

