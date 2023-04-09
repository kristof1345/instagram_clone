import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { app, database, auth, storage } from "../firebaseConfig";
import { BiArrowBack } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "../components/Post";

const PostPage = () => {
  const { postID } = useParams();
  const [post, setPost] = useState();
  const [user] = useAuthState(auth);
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
    <div className="post_page">
      <div className="post_page-header">
        <Link className="back" to={`/profile/${post ? post.uid : null}`}>
          <BiArrowBack />
        </Link>
      </div>
      <div className="post_page-post">{post ? <Post post={post} /> : null}</div>
    </div>
  );
};

export default PostPage;
