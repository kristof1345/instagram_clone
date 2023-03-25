import BottomNav from "../components/BottomNav";
import ProfPosts from "../components/ProfPosts";
import NoPosts from "../components/NoPosts";

import { collection, query } from "firebase/firestore";

import { app, database, auth, storage } from "../firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [postids, setPostids] = useState([]);
  let currUser;
  const x = false;

  const usersRef = collection(database, "users");
  const q = query(usersRef);
  const [users, loading, error] = useCollectionData(q);

  if (users !== undefined && users.length !== 0) {
    users.map((userEl) => {
      if (userEl.uid === user.uid) {
        currUser = userEl;
      }
    });
  }

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
        <div className="prof_name">{user ? user.displayName : null}</div>
      </div>
      <div className="prof_description-sec">
        <div className="user-name-changeable">
          {user ? user.displayName : null}
        </div>
        <div className="prof-description">eiroooer erob erb erobeorb</div>
      </div>
      <div className="follower-stats">
        <div className="posts-sec">
          <div className="posts-counter">0</div>
          <div>posts</div>
        </div>
        <div className="follower-sec">
          <div className="follower-counter">0</div>
          <div>followers</div>
        </div>
        <div className="following-sec">
          <div className="following-counter">0</div>
          <div>following</div>
        </div>
      </div>
      {currUser ? (
        currUser.postIDs.length > 0 ? (
          <ProfPosts currUser={currUser} />
        ) : (
          <NoPosts styles={{ height: "65vh" }} />
        )
      ) : null}
      {/* {postids.length > 0 ? (
        <ProfPosts currUser={currUser} />
      ) : (
        <NoPosts styles={{ height: "65vh" }} />
      )} */}
      <BottomNav />
    </div>
  );
};

export default Profile;
