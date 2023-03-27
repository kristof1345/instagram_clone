import React, { useEffect, useState } from "react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbDotsVertical } from "react-icons/tb";

import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { ref, deleteObject } from "firebase/storage";

import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import { app, database, auth, storage } from "../firebaseConfig";

const Post = ({ post }) => {
  const [user] = useAuthState(auth);
  const [liked, setLiked] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const updateLikes = () => {
    let likesCount = post.likes;
    let userLikes = post.usersWhoLiked;
    if (!liked) {
      // like + 1
      let docRef = doc(database, "posts", post.id);
      updateDoc(docRef, {
        likes: (likesCount += 1),
        usersWhoLiked: [...userLikes, user.uid],
      });
    } else if (liked) {
      // like - 1
      let ind = userLikes.indexOf(user.id);
      userLikes.splice(ind, 1);
      let docRef = doc(database, "posts", post.id);
      updateDoc(docRef, {
        likes: (likesCount -= 1),
        usersWhoLiked: userLikes,
      });
    }
  };

  const deletePost = async () => {
    let postId = post.id;
    let arr = [];
    let docRef = doc(database, "posts", postId);
    let usersRef = collection(database, "users");
    deleteDoc(docRef);
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    let currUser = arr.filter((elem) => elem.uid === user.uid);
    let prevPosts = currUser[0].postIDs;
    let docToUp = doc(database, "users", currUser[0].id);
    let newPosts = prevPosts.filter((elem) => elem !== postId);
    updateDoc(docToUp, {
      postIDs: newPosts,
    });
    let imageRef = ref(storage, `images/${post.imageName}`);
    deleteObject(imageRef);
  };

  useEffect(() => {
    let users = post.usersWhoLiked;
    if (users.includes(user.uid)) {
      setLiked(true);
    }
  }, []);

  return (
    <div className="post">
      <div className="post-prof-sec">
        <Link>
          <img
            className="post-prof-sec-prof_pic"
            src={user ? user.photoURL : null}
          />
          <span className="post-prof-sec-prof_name">{post.username}</span>
        </Link>
        <TbDotsVertical
          className="three-dots"
          onMouseOver={() => setPopUp(true)}
          onMouseOut={() => setPopUp(false)}
        ></TbDotsVertical>
        {popUp && (
          <div className="delete-overlay">
            <div className="delete-option" onClick={() => deletePost()}>
              Delete
            </div>
          </div>
        )}
      </div>
      <div className="post_pic-sec">
        <img src={post.imageUrl} alt="post" className="post_pic" />
      </div>
      <div className="interactions">
        {liked ? (
          <AiFillHeart
            className="heart-icon"
            onClick={() => {
              setLiked((prev) => !prev);
              updateLikes();
            }}
          />
        ) : (
          <AiOutlineHeart
            className="heart-icon"
            onClick={() => {
              setLiked((prev) => !prev);
              updateLikes();
            }}
          />
        )}
        <span className="like-counter">{post.likes} likes</span>
      </div>
      <div className="description">
        <span className="desc-prof_name">{post.username}</span>
        {post.description}
      </div>
    </div>
  );
};

export default Post;
