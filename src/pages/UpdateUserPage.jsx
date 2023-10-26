import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const UpdateUserPage = () => {
  //const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [languages, setLanguages] = useState(['Javascript', 'Python', 'Java', 'C++', 'C#']);
  const [level, setLevel] = useState("");
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const onSubmit = async event  => {
    event.preventDefault();

    const payload = { userName, email, password, languages, level, photo, country };

    try {
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
        navigate(`/users/${user.userId}`)
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.userId}`
      );
      
      if (response.ok) {
        const user = await response.json();
        console.log(user)
        setUserName(user.user.username);
        setEmail(user.user.email);
        setPassword(user.user.password);
        setLanguages(user.user.languages);
        setPhoto(user.user.photo);
        setLevel(user.user.level);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.currentTarget.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>

        {/*<div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
  </div>*/}

        <div>
          <label>Languages</label>
          <select
            value={languages}
            multiple={true}
            onChange={(e) => 
              {const options = [...e.currentTarget.selectedOptions];
               const values = options.map(option => option.value)
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
            onChange={(event) => setLevel(event.currentTarget.value)}
          >
            <option value="Learner">"Learner"</option>
            <option value="Junior">"Junior"</option>
            <option value="Senior">"Senior"</option>
          </select>
        </div>
        <label>Country
          <input value={country} onChange={(event) => setCountry(event.currentTarget.value)}/>
        </label>
        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            value={photo}
            onChange={(event) => setPhoto(event.currentTarget.value)}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateUserPage;
