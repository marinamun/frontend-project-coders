import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import "../pages/Profile.css";

const Profile = () => {
  // To protect the user page. Only the logged-in user can access it.
  const { fetchWithToken, user } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const [oneUser, setOneUser] = useState(null);
  const [userQuestions, setUserQuestions] = useState([]);
  console.log(user);

  const fetchUser = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.userId}`
      );
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json();
        console.log(parsedFromBackend);
        setOneUser(parsedFromBackend.user);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.userId}/questions`
      );
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json();
        console.log(parsedFromBackend);
        
        setUserQuestions(parsedFromBackend.userQuestions);
        console.log(parsedFromBackend.userQuestions);
      } else {
        console.error("Failed to fetch question data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchQuestions();
  }, [user.userId]);

  return oneUser ? (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="info">
          <h1>Hi {oneUser.username}👋🏼</h1>
          <img
            src={oneUser.photo}
            alt="profile photo"
            style={{ width: "200px" }}
          />
          <div className="details">
            <h3>{oneUser.username}</h3>
            <p>{oneUser.email}</p>
            <p>🌍{oneUser.country}</p>
            <p>💻{oneUser.languages}</p>
            <p>{oneUser.level}</p>
          </div>

          <Link to={`/users/update`}>
            <button type="button" className="update-btn">
              ⚙️SETTINGS
            </button>
          </Link>
        </div>
        <div className="questions">
          <h1>Your questions</h1>
          {userQuestions &&
            userQuestions.map((question) => (
              <div key={question._id}>
                <Link to={`/feed/${question._id}`}>
                  <p className="each-question">
                    <span id="emoji">💬</span><span id="title">{question.title}</span>{" "}
                  </p>
                </Link>
                
              </div>
            ))}
        </div>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Profile;

/* T - Profile: show the info + update button (takes you to updateuserpage) + your questions/cards, postYourQuestion button */
