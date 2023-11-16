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
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Homepage;
