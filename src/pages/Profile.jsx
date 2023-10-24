import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  //To protect the user page. Only the logged in user can access it.
  const { fetchWithToken } = useContext(AuthContext);

  useEffect(() => {
    fetchWithToken("/users", (parsed) => {
      console.log(parsed);
    });
  }, [])

  return (
    <>
    <Navbar/>
      <h1>This is the user's page</h1>

      <button>Update</button>
    </>
  );
};
export default Profile;
