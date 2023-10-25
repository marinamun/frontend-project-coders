import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateUserPage = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [languages, setLanguages] = useState("");
  const [level, setLevel] = useState("");
  const [photo, setPhoto] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = { userName, email, password, languages, level, photo };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/updateuserpage`,
        {
          method: "PUT",
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
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <form className="form-login" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
className="cats-input"
            type="text"
            name="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
className="cats-input"
            type="text"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
className="cats-input"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="languages">Languages</label>
          <select
            name="languages"
            value={languages}
            onChange={(event) => setLanguages(event.target.value)}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="level">Level</label>
          <input
            className="cats-input"
            type="text"
            name="level"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo URL:</label>
          <input
className="cats-input"
            type="text"
            name="photo"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateUserPage;
