import logo from "../../public/instagram_logo.png";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { v4 } from "uuid";

import {
  collection,
  addDoc,
  query,
  doc,
  updateDoc,
  orderBy,
  getDocs,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { app, database, auth, storage } from "../firebaseConfig";

const SignIn = () => {
  const collectionRef = collection(database, "users");

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((x) => {
      findOtherUsers(x.user.email).then((shouldCreateAUser) => {
        if (shouldCreateAUser) {
          addDoc(collectionRef, {
            displayName: x.user.displayName,
            email: x.user.email,
            photoURL: x.user.photoURL,
            uid: x.user.uid,
            id: "",
            followers: [],
            following: [],
            postIDs: [],
          }).then((docRef) => {
            let docToUp = doc(database, "users", docRef.id);
            updateDoc(docToUp, {
              id: docRef.id,
            }).catch((err) => console.log(err));
          });
        }
      });
    });
  };

  const findOtherUsers = async (email) => {
    let res = true;
    let arr = [];
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    if (arr.length > 0) {
      arr.map((user) => {
        console.log(user);
        if (user.email == email) {
          res = false;
        }
      });
    }
    return res;
  };

  return (
    <div className="sign-in-holder">
      <div className="sign-in-options">
        <img className="sign-in-logo" src={logo} alt="logo" />
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
