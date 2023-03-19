import { BsHouse } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";
import { app, auth } from "../firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";

const BottomNav = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="bottom-nav">
      <Link to="/">
        <BsHouse className="BN-icon" />
      </Link>
      <Link>
        <BiAddToQueue className="BN-icon" />
      </Link>
      <Link to="/profile">
        <img src={user.photoURL} alt="user-image" className="BN-prot-pic" />
      </Link>
    </div>
  );
};

export default BottomNav;
