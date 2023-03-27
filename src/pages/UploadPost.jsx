import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { v4 } from "uuid";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import { app, database, auth, storage } from "../firebaseConfig";

const UploadPost = () => {
  const [user] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);
  const [descUpload, setDescUpload] = useState("");
  const collectionRef = collection(database, "posts");
  const usersRef = collection(database, "users");

  const uploadImage = () => {
    let imageName = imageUpload.name + v4();
    if (imageUpload === null) alert("Please select an image");
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(ref(storage, `images/${imageName}`))
        .then((url) => {
          addDoc(collectionRef, {
            timestamp: serverTimestamp(),
            description: descUpload,
            imageUrl: url,
            imageName: imageName,
            username: user.displayName,
            likes: 0,
            id: "",
            uid: user.uid,
            usersWhoLiked: [],
          }).then((docRef) => {
            let docToUp = doc(database, "posts", docRef.id);
            updateDoc(docToUp, {
              id: docRef.id,
            });
            pushPostToUser(docRef.id);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const pushPostToUser = async (postID) => {
    let arr = [];
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    let currUser = arr.filter((elem) => elem.uid === user.uid);
    let prevPosts = currUser[0].postIDs;
    let docToUp = doc(database, "users", currUser[0].id);
    updateDoc(docToUp, {
      postIDs: [...prevPosts, postID],
    });
  };

  return (
    <div className="upload-post">
      <div className="upload-holder">
        <form className="upload-form">
          <input
            type="file"
            accept="image/*"
            className="img-upload"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <textarea
            className="desc-upload"
            placeholder="Add a description..."
            onChange={(e) => setDescUpload(e.target.value)}
          />
        </form>
        <button className="upload-btn" onClick={() => uploadImage()}>
          Upload Post
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default UploadPost;
