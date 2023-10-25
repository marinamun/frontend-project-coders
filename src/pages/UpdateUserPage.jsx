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
   const [country, setCountry] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = { userName, email, password, languages, level, photo, country };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/updateuserpage${
          isUpdate ? `/${id}` : ""
        }`,
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


   const fetchUser = async () => {
     try {
       const response = await fetch(
         `${import.meta.env.VITE_API_URL}/updateuserpage${isUpdate ? `/${id}` : ""}`
       );
       if (response.ok) {
         const user = await response.json();
         setUserName(user.userName);
         setEmail(user.email);
         setPassword(user.password);
         setLanguages(user.languages);
         setPhoto(user.photo);
         setLevel(user.level);
       }
     } catch (error) {
       console.log(error);
     }
   };
   useEffect(() => {
     if (isUpdate) {
       fetchUser();
     }
   }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <label>Languages</label>
          <select
            value={languages}
            onChange={(event) => setLanguages(event.target.value)}
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

        {/* <select
            value={level}
            onChange={(event) => setLanguages(event.target.value)}
          > */}
            <option value="JavaScript">"JavaScript"</option>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          >
            <option value="France">"France"</option>
            <option value="India">"India"</option>
            <option value="Canada">"Canada"</option>
            <option value="China">"China"</option>
          </select>
        </div>

        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
          />
        </div>

        <button type="submit">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateUserPage;
