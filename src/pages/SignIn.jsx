import { app, auth } from "../firebaseConfig";
import logo from "../../public/instagram_logo.png";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="sign-in-holder">
      <div className="sign-in-options">
        <img className="sign-in-logo" src={logo} alt="logo" />
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
