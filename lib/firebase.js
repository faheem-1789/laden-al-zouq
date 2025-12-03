// Firebase client initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-NOcH3DFRLOsb6-1a45bIIy2CMXkcH5s",
  authDomain: "bufiya-app.firebaseapp.com",
  projectId: "bufiya-app",
  storageBucket: "bufiya-app.firebasestorage.app",
  messagingSenderId: "146106110232",
  appId: "1:146106110232:web:d0ddcb5d303c5df9f08e6d",
  measurementId: "G-51S4MP5LRC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
