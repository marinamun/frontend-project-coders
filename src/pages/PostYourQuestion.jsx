import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const PostYourQuestions = () => {
  const { fetchWithToken } = useContext(AuthContext);

  useEffect(() => {
    fetchWithToken("/users", (parsed) => {
      console.log(parsed);
    });
  }, []);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = { title, text, file };
    const currentToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/new`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",

            Authorization: `Bearer ${currentToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 201) {
        const yourQuestion = await response.json();
        console.log(yourQuestion);
        navigate(`/feed/${yourQuestion.question._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
        <label>
          File
          <input
            value={file}
            type=""
            onChange={(event) => setFile(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default PostYourQuestions;
