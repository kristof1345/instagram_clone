import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { v4 } from "uuid";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { app, database, auth, storage } from "../firebaseConfig";

const UploadPost = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [descUpload, setDescUpload] = useState("");

  const uploadImage = () => {
    let imageName = imageUpload.name + v4();
    if (imageUpload === null) alert("Please select an image");
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(ref(storage, `images/${imageName}`))
        .then((url) => {
          console.log(url);
        })
        .catch((err) => {
          console.log(err);
        });
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