import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfrHE3uB5LdW6rb5FbxdSVlBG3X_VqzT0",
  authDomain: "instagram-clone2-eb5b2.firebaseapp.com",
  projectId: "instagram-clone2-eb5b2",
  storageBucket: "instagram-clone2-eb5b2.appspot.com",
  messagingSenderId: "1090185974774",
  appId: "1:1090185974774:web:f7b3ccfdcae42bc14e2dd7",
  measurementId: "G-F16V8MED7T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
