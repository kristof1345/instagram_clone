import BottomNav from "../components/BottomNav";
import NoPosts from "../components/NoPosts";
import SmallPost from "../components/SmallPost";

import { useParams } from "react-router-dom";

import {
  collection,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { app, database, auth, storage } from "../firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";

const Profile = () => {
  const { uid } = useParams();
  const [user] = useAuthState(auth);
  let currUser;
  const [follow, setFollow] = useState(
    JSON.parse(localStorage.getItem("follow")) || false
  );

  useEffect(() => {
    localStorage.setItem("follow", JSON.stringify(follow)); //TODO not workingggggggggg
  }, [follow]);

  const usersRef = collection(database, "users");
  const q = query(usersRef);
  const [users, loading, error] = useCollectionData(q);

  if (users !== undefined && users.length !== 0) {
    users.map((userEl) => {
      if (userEl.uid === uid) {
        currUser = userEl;
      }
    });
  }

  const followUser = async () => {
    let followedID = "";
    let followerID = "";
    users.map((userX) => {
      if (userX.uid === uid) {
        followedID = userX.id;
      }
      if (userX.uid === user.uid) {
        followerID = userX.id;
      }
    });
    let followedRef = doc(database, "users", followedID);
    let followerRef = doc(database, "users", followerID);
    updateDoc(followedRef, {
      followers: arrayUnion(user.uid),
    });
    updateDoc(followerRef, {
      following: arrayUnion(uid),
    });
  };

  const unfollowUser = async () => {
    let followedID = "";
    let followerID = "";
    users.map((userX) => {
      if (userX.uid === uid) {
        followedID = userX.id;
      }
      if (userX.uid === user.uid) {
        followerID = userX.id;
      }
    });
    let followedRef = doc(database, "users", followedID);
    let followerRef = doc(database, "users", followerID);
    updateDoc(followedRef, {
      followers: arrayRemove(user.uid),
    });
    updateDoc(followerRef, {
      following: arrayRemove(uid),
    });
  };

  return (
    <div className="prof_page">
      <div className="prof_name-sec">
        <div className="prof_img">
          <img
            src={user ? user.photoURL : null}
            className="prof-sec-img"
            alt="profile picture"
          />
        </div>
        <div className="prof_name">
          {currUser ? currUser.displayName : null}
          {currUser ? (
            currUser.uid !== user.uid ? (
              !follow ? (
                <div
                  className="follow_btn"
                  onClick={() => {
                    followUser();
                    setFollow((prev) => !prev);
                  }}
                >
                  Follow
                </div>
              ) : (
                <div
                  className="unfollow_btn"
                  onClick={() => {
                    unfollowUser();
                    setFollow((prev) => !prev);
                  }}
                >
                  Unfollow
                </div>
              )
            ) : null
          ) : null}
        </div>
      </div>
      <div className="prof_description-sec">
        <div className="user-name-changeable">
          {currUser ? currUser.displayName : null}
        </div>
        <div className="prof-description">eiroooer erob erb erobeorb</div>
      </div>
      <div className="follower-stats">
        <div className="posts-sec">
          <div className="posts-counter">
            {currUser ? currUser.postIDs.length : null}
          </div>
          <div>posts</div>
        </div>
        <div className="follower-sec">
          <div className="follower-counter">
            {currUser ? currUser.followers.length : null}
          </div>
          <div>followers</div>
        </div>
        <div className="following-sec">
          <div className="following-counter">
            {currUser ? currUser.following.length : null}
          </div>
          <div>following</div>
        </div>
      </div>

      {currUser ? (
        currUser.postIDs.length > 0 ? (
          <div className="posts-grid">
            {currUser.postIDs.map((postID, i) => (
              <SmallPost postID={postID} key={i} />
            ))}
          </div>
        ) : (
          <NoPosts styles={{ height: "65vh" }} />
        )
      ) : null}

      <BottomNav />
    </div>
  );
};

export default Profile;
