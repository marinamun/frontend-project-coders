import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AbortedDeferredError, Link } from "react-router-dom";

const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllQuestions = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions`
      );
      if (responseFromBackend.ok) {
        const parsed = await responseFromBackend.json();
        setQuestions(parsed.questions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`
      );
      if (responseFromBackend.ok) {
        const parsed = await responseFromBackend.json();
        setUsers(parsed.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestions();
    getAllUsers();
  }, []);

  return (
    <>
      <Navbar />
      <h1>FEEEEED👋🏼</h1>

      <div>
        <label>
          Search
          <input />
        </label>
      </div>
      <div>
        <Link to={"/feed/new"}>
          <button>+</button>
        </Link>
      </div>
      <ul className="post">
        {questions &&
          questions.map((question) => (
            <li key={question._id}>
              <div>
                <div>
                  <Link to={`/feed/${question._id}`}>
                    <img src={question.owner.photo} />
                    <h3>{question.title}</h3>
                    <p>{question.text}</p>
                    <p>{question.photo}</p>
                  </Link>
                </div>
                <div>
                  <button>Like</button>
                  <Link to={`/feed/${question._id}/answers}`}>
                    <button>Comments</button>
                  </Link>
                  <button>Share</button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
export default Feed;
