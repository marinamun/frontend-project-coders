import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import "../pages/Homepage.css"
import logo from '../assets/logo.png'

const Homepage = () => {
  return (
    <>
    <div className="homepageDiv">
      <img src={logo} alt="logo" />
      <h1>WELCOME👋🏼</h1>
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
