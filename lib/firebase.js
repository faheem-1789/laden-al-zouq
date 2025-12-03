// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-NOcH3DFRLOsb6-1a45bIIy2CMXkcH5s",
  authDomain: "bufiya-app.firebaseapp.com",
  projectId: "bufiya-app",
  storageBucket: "bufiya-app.firebasestorage.app",
  messagingSenderId: "146106110232",
  appId: "1:146106110232:web:d0ddcb5d303c5df9f08e6d",
  measurementId: "G-51S4MP5LRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
