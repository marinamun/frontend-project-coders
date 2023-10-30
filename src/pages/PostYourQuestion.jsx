import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";

const PostYourQuestion = () => {
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWithToken("/users", (parsed) => {
      console.log(parsed);
    });
  }, []);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("JavaScript");

  const onSubmit = async (event) => {
    event.preventDefault();
    const image = event.target.image.files[0];
    const formData = new FormData();

    if (image) {
      formData.append("imageUrl", image);
    }

    formData.append("text", text);
    formData.append("title", title);
    formData.append("languages", language);

    console.log(formData);

    const currentToken = localStorage.getItem("authToken");

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/questions/new`, formData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
      .then((res) => {
        navigate(`/feed/${res.data.question._id}`);
      })
      .catch((error) => {
        console.log("Error posting question:", error);
      });
  };

  return (
    <>
      <Navbar />
      <h1>Ask your question!</h1>
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={title}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Text
          <input
            value={text}
            type="text"
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <label> Language:</label>
        <select
          name="languages"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
        </select>

        <input type="file" name="image" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PostYourQuestion;
