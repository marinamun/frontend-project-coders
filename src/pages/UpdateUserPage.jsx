import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../pages/Profile.css";

const UpdateUserPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [languages, setLanguages] = useState([
    "Javascript",
    "Python",
    "Java",
    "C++",
    "C#",
  ]);
  const [level, setLevel] = useState("");
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");
  //const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.userId}`
      );

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        setUserName(user.user.username);
        setEmail(user.user.email);
        setLanguages(user.user.languages);
        setPhoto(user.user.photo);
        setLevel(user.user.level);
        setCountry(user.user.country);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    /*const payload = { userName, email, languages, level, photo, country };*/
    const currentToken = localStorage.getItem("authToken");

    const photo = event.target.image.files[0];

    const formData = new FormData();

    if (photo) {
      formData.append("imageUrl", photo);
    }
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("languages", languages);
    formData.append("level", level);
    formData.append("country", country);
    console.log(formData);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/users/${user.userId}`,
        formData,
        {
          headers: {
            /*"Content-type": "multipart/form-data", ///removed json!!!*/

            Authorization: `Bearer ${currentToken}`,
          },
        }
      )
      .then((res) => {
        navigate(`/users`);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server error data:", error.response.data);
        } else {
          console.log("Error updating user:", error);
        }
      });

    /*try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.userId}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 200) {
        await response.json();
        navigate(`/users`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    */
  };

  return (
    <>
      <Navbar />
      <h1 style={{ color: "white", textAlign: "center" }}>
        ⚙️Update your details:
      </h1>
      <div className="update-container">
        <form onSubmit={onSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={userName}
              className="form-input"
              onChange={(event) => setUserName(event.currentTarget.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              className="form-input"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>

          <div>
            <label>Languages</label>
            <select
              value={languages}
              multiple={true}
              className="form-input"
              id="languages-input"
              onChange={(e) => {
                const options = [...e.currentTarget.selectedOptions];
                const values = options.map((option) => option.value);
                setLanguages(values);
              }}
            >
              <option value="JavaScript">"JavaScript"</option>
              <option value="Python">"Python"</option>
              <option value="Java">"Java"</option>
              <option value="C++">"C++"</option>
              <option value="C#">"C#"</option>
            </select>
          </div>

          <div>
            <label>Level</label>

            <select
              value={level}
              className="form-input"
              onChange={(event) => setLevel(event.currentTarget.value)}
            >
              <option value="Learner">"Beginner"</option>
              <option value="Junior">"Junior"</option>
              <option value="Senior">"Senior"</option>
            </select>
          </div>
          <div>
            <label>Country </label>
            <input
              value={country}
              className="form-input"
              onChange={(event) => setCountry(event.currentTarget.value)}
            />
          </div>
          <div>
            <label>Photo URL:</label>
            <input
              type="file"
              className="form-input"
              id="file-box"
              name="image"
            />
          </div>

          <button
            type="submit"
            className="updatepage-btn"
            style={{ marginTop: "30px" }}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUserPage;
