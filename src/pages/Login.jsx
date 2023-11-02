import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../pages/Homepage.css"

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();
        throw new Error(parsed.message);
      }
      if (response.status === 200) {
        const parsed = await response.json();
        handleLogin(parsed.token);
        navigate("/feed");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
    <div className="loginDiv">
          <img src="https://media.giphy.com/media/EK24OWrJSy1GkkNu0y/giphy.gif" alt="" style={{ width: "200px" }} />
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
          />
        </label>
        <button className="loginBtn" type="submit">Log In</button>
      </form>
      </div>
    </>
  );
};

export default Login;
