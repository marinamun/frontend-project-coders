import { Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./pages/Homepage";
import Feed from "./pages/Feed";
import PostYourQuestion from "./pages/PostYourQuestion";
import OneQuestion from "./pages/OneQuestion";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/new"
          element={
            <PrivateRoute>
              <PostYourQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <OneQuestion />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
