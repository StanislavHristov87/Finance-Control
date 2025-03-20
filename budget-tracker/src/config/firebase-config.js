// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXfUi0KtNB98bLrRTPMJkuDsspVPDUzp0",
  authDomain: "finance-control-ec52a.firebaseapp.com",
  databaseURL: "https://finance-control-ec52a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finance-control-ec52a",
  storageBucket: "finance-control-ec52a.firebasestorage.app",
  messagingSenderId: "897920775853",
  appId: "1:897920775853:web:b1d930f1dcf31edbb27824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
