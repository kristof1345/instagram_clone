import React, { useEffect, useState } from "react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { doc, updateDoc } from "firebase/firestore";

import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import { app, database, auth, storage } from "../firebaseConfig";

const Post = ({ post }) => {
  const [user] = useAuthState(auth);
  const [liked, setLiked] = useState(false);

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
          <span className="post-prof-sec-prof_pic"></span>
          <span className="post-prof-sec-prof_name">{post.username}</span>
        </Link>
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
