import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../pages/Postyourquestion.css";

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
      <h1>👩🏼‍💻Ask your question!</h1>
      <div className="question-container">
        <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <input
              value={title}
              type="text"
              className="text-input"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label>Text</label>
            <input
              value={text}
              type="text"
              className="text-input"
              onChange={(event) => setText(event.target.value)}
            />
          </div>
          <div>
            <label> Language:</label>
            <select
              name="languages"
              value={language}
              id="selector"
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="C#">C#</option>
            </select>
          </div>
          <div>
            <input type="file" name="image" id="selector" />
          </div>

          <button
            type="submit"
            className="submit-btn"
            style={{ marginTop: "30px" }}
          >
            Submit
          </button>
          <img
            src="https://i.giphy.com/media/WDbNojCLBFs3r0c10h/giphy.webp"
            style={{ width: "100px" }}
            className="gif"
          />
        </form>
      </div>
    </>
  );
};

export default PostYourQuestion;
