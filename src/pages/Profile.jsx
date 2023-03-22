import BottomNav from "../components/BottomNav";

import { app, database, auth, storage } from "../firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user] = useAuthState(auth);
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
      <BottomNav />
    </div>
  );
};

export default Profile;
