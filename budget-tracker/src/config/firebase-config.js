// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZaPP4DQRgkMPnq7WILCGIlguGTPfFNCo",
  authDomain: "myhiguysapp.firebaseapp.com",
  projectId: "myhiguysapp",
  storageBucket: "myhiguysapp.appspot.com",
  messagingSenderId: "940129728459",
  appId: "1:940129728459:web:ea241d0b28b08a08a5a84e",
  measurementId: "G-XHEQPTVRYX",
  databaseURL: "https://finance-control-ec52a-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
