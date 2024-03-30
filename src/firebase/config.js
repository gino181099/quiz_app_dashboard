// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuoQP5G-02BJMK6A-wLJgD6diJSorUum0",
  authDomain: "quizgame-bbc2f.firebaseapp.com",
  projectId: "quizgame-bbc2f",
  storageBucket: "quizgame-bbc2f.appspot.com",
  messagingSenderId: "612763893615",
  appId: "1:612763893615:web:ca586b119689b74a29b29a",
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const database = getFirestore(firebase_app);
