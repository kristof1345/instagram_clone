import { app, auth } from "../firebaseConfig";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Post from "../components/Post";

import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Header />
      <div className="stories">
        <img src={user.photoURL} alt="photo" className="story" />
      </div>
      <div className="posts">
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
        <div className="post"></div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
