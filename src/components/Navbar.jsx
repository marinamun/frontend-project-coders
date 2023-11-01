import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

import logo from '../assets/logo.png'

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav>
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="navbarWords">
        <ul className="navbarWordsOther">
          <li className="navbarOne">
            <Link to="/feed">Feed</Link>
          </li>

          <li className="navbarTwo">
            <Link to={`/users`}>Your profile</Link>
          </li>
        </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
