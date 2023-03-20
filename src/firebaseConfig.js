import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrnZnsbvTFZAgrYJ8k0v2XeDqcLjwys-Y",
  authDomain: "instagram-clone-d5d57.firebaseapp.com",
  projectId: "instagram-clone-d5d57",
  storageBucket: "instagram-clone-d5d57.appspot.com",
  messagingSenderId: "326085808772",
  appId: "1:326085808772:web:e5d1ac5d0354b81ad4e8d1",
  measurementId: "G-69EG6ZK96S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
