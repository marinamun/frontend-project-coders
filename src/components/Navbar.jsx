import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>

          <li>
            <Link to="/profile/:profileId">Your profile</Link>
          </li>
        </ul>
      </nav>
      ;
    </>
  );
};
export default Navbar;
