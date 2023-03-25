import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import UploadPost from "./pages/UploadPost";
import PostPage from "./pages/PostPage";
import { app, auth } from "./firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/post/:postID" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
