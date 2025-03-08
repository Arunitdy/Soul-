// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCLX30-cyFx_I5hM4R8m2p6Pdj9Udam9cQ",
  authDomain: "soul-41fb1.firebaseapp.com",
  projectId: "soul-41fb1",
  storageBucket: "soul-41fb1.firebasestorage.app",
  messagingSenderId: "844915449729",
  appId: "1:844915449729:web:9ed4ea0df5fe51c2735280",
  measurementId: "G-28X120NH7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);