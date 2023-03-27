import BottomNav from "../components/BottomNav";
import NoPosts from "../components/NoPosts";
import SmallPost from "../components/SmallPost";

import { useParams } from "react-router-dom";

import { collection, query } from "firebase/firestore";

import { app, database, auth, storage } from "../firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Profile = () => {
  const { uid } = useParams();
  const [user] = useAuthState(auth);
  let currUser;

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
              <div className="follow_btn">Follow</div>
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
