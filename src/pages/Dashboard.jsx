import { app, auth } from "../firebaseConfig";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Post from "../components/Post";

const Dashboard = () => {
  return (
    <div className="App">
      <Header />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
