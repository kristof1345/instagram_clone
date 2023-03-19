import { app, auth } from "../firebaseConfig";

import logo from "../../public/instagram_logo.png";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="main-logo" />
      <FaSignOutAlt className="sign-out" onClick={() => auth.signOut()} />
    </div>
  );
};

export default Header;
