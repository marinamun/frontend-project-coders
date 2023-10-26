import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { useParams, useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  // To protect the user page. Only the logged-in user can access it.
  const { fetchWithToken, user } = useContext(AuthContext);


  const UserProfile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [oneUser, setOneUser] = useState(null);

    const fetchUser = async () => {
      try {
        const responseFromBackend = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`
        );
        console.log(userId);
        if (responseFromBackend.ok) {
          const parsedFromBackend = await responseFromBackend.json();
          console.log(parsedFromBackend);
          setOneUser(parsedFromBackend.oneUser);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      fetchUser();
    }, []);

    return oneUser ? (
      <>
        <Navbar />
        <h1>This is the user's page</h1>
        <img src={oneUser.photo} alt="profile photo" />
        <h3>{oneUser.username}</h3>
        <p>{oneUser.email}</p>
        <p>{oneUser.country}</p>
        <p>{oneUser.languages}</p>
        <p>{oneUser.level}</p>

        <Link to={`/users/${userId}/update`}>
        <button type='button'>Update</button>
      </Link>
      </>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

export default Profile;



/* T - Profile: show the info + update button (takes you to updateuserpage) + your questions/cards, postYourQuestion button */