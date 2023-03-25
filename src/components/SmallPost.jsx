import React, { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { app, database, auth, storage } from "../firebaseConfig";

const SmallPost = ({ postID }) => {
  const [post, setPost] = useState();
  const postRef = doc(database, "posts", postID);

  const getPost = async () => {
    return await getDoc(postRef).then((resPost) => {
      setPost(resPost.data());
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Link to={`/post/${postID}`}>
      <img src={post ? post.imageUrl : null} alt="image" className="img" />
    </Link>
  );
};

export default SmallPost;
