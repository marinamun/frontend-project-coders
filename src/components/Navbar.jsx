import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/feed">Feed</Link>
          </li>

          <li>
            <Link to={`/users`}>Your profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
