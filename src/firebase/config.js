// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSwAXOLRECB7xDBAnP98NA8Jk0a7hCck4",
  authDomain: "utakapp-813c3.firebaseapp.com",
  projectId: "utakapp-813c3",
  storageBucket: "utakapp-813c3.appspot.com",
  messagingSenderId: "539453691048",
  appId: "1:539453691048:web:61f072668e078e54851e9d",
  measurementId: "G-7MDQD910JQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
