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

  const onSubmit = async (event) => {
    event.preventDefault();
    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("text", text);
    formData.append("title", title);

    const payload = { title, text };
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
          body: JSON.stringify(formData),
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
        <input type="file" name="image" />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default PostYourQuestions;
