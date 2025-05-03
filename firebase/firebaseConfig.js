// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCLX30-cyFx_I5hM4R8m2p6Pdj9Udam9cQ",
  authDomain: "soul-41fb1.firebaseapp.com",
  projectId: "soul-41fb1",
  storageBucket: "soul-41fb1.appspot.com",
  messagingSenderId: "844915449729",
  appId: "1:844915449729:web:9ed4ea0df5fe51c2735280",
  measurementId: "G-28X120NH7S"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Initialize Firestore
window.db = firebase.firestore();

console.log("🔥 Firestore initialized:", window.db);
