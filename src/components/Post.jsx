import React from "react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Link } from "react-router-dom";

const Post = ({ post }) => {
  console.log(post.imageUrl);
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
        <AiOutlineHeart className="heart-icon" />
        <span className="like-counter">0 likes</span>
      </div>
      <div className="description">
        <span className="desc-prof_name">{post.username}</span>
        {post.description}
      </div>
    </div>
  );
};

export default Post;
