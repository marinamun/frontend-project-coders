import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  // To protect the user page. Only the logged-in user can access it.
  const { fetchWithToken } = useContext(AuthContext);

  useEffect(() => {
    fetchWithToken("/users", (parsed) => {
      console.log(parsed);
    });
  }, [])

  const UserProfile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState();

    const fetchUser = async () => {
      try {
        const responseFromBackend = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`
        );
        if (responseFromBackend.ok) {
          const parsedFromBackend = await responseFromBackend.json();
          console.log(parsedFromBackend);
          setUser(parsedFromBackend.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      fetchUser();
    }, [userId]);

    return user ? (
      <>
        <Navbar />
        <h1>This is the user's page</h1>
        <img src={user.photo} alt="profile photo" />
        <h3>{user.username}</h3>
        <p>{user.email}</p>
        <p>{user.country}</p>

        <button>Update</button>
      </>
    ) : (
      <h1>Loading...</h1>
    );
  }

  return <UserProfile />; // Call the UserProfile component
}

export default Profile;



/* T - Profile: show the info + update button (takes you to updateuserpage) + your questions/cards, postYourQuestion button */