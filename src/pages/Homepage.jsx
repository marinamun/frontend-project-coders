import { Link } from "react-router-dom";
import "../pages/Homepage.css";
import logo from "../assets/logo.png";

const Homepage = () => {
  return (
    <>
      <div className="homepageDiv">
        <img src={logo} alt="logo" />
        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Homepage;
