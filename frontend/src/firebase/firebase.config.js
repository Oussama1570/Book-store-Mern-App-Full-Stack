// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAGH7qQ0sQIO01NunlxOrANqPygJU7Agg",
  authDomain: "product-store-mern-app-13549.firebaseapp.com",
  projectId: "product-store-mern-app-13549",
  storageBucket: "product-store-mern-app-13549.appspot.com",
  messagingSenderId: "6944142108",
  appId: "1:6944142108:web:7dae885f7a5f9bf2ed00d9",
  measurementId: "G-X1HHKC5SVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);