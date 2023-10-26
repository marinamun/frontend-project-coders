import { Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./pages/Homepage";
import Feed from "./pages/Feed";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import PostYourQuestions from "./pages/PostYourQuestion";
import PostYourQuestion from "./pages/PostYourQuestion";
import UpdateUserPage from "./pages/UpdateUserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Route to the see all the questions in the feed*/}
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        {/* Route to the see details of one question*/}
        <Route
          path="/feed/:questionId"
          element={
            <PrivateRoute>
              <QuestionDetailsPage />
            </PrivateRoute>
          }
        />
      
        {/* Route to the see details of one user*/}
        <Route
          path="/users"
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

        {/* Route to add a question*/}
        <Route
          path="/users/update"
          element={
            <PrivateRoute>
              <UpdateUserPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;
