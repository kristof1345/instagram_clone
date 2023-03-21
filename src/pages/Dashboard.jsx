import { app, database, auth } from "../firebaseConfig";

import { collection, query, orderBy } from "firebase/firestore";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import NoPosts from "../components/NoPosts";
import Posts from "../components/Posts";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const collectionRef = collection(database, "posts");

  const q = query(collectionRef, orderBy("timestamp"));
  const [posts, loading, error] = useCollectionData(q);

  console.log(posts);

  return (
    <div className="App">
      <Header />
      <div className="stories">
        <img src={user.photoURL} alt="photo" className="story" />
      </div>
      {posts !== undefined && posts.length !== 0 ? (
        <Posts posts={posts} />
      ) : (
        <NoPosts />
      )}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
