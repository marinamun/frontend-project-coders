import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
const Homepage = () => {
  return (
    <>
      <h1>The HOMEPAGE👋🏼</h1>
      <ul>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </>
  );
};
export default Homepage;
