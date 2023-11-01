import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {  Link, useParams } from "react-router-dom";
import "../pages/Feed.css"

const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [answerNumber, setAnswerNumber] = useState(0);
  const { answerId } = useParams();

  const getAllQuestions = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions`
      );
      if (responseFromBackend.status === 201) {
        const parsed = await responseFromBackend.json();
        console.log(parsed);
        setQuestions(parsed.allQuestions);
        //allQuestions comes from the backend
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
      console.log(responseFromBackend)
      if (responseFromBackend.status === 200) {
        
        const parsed = await responseFromBackend.json();
        console.log(parsed);
        setUsers(parsed.allUsers)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilter = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const filteredLanguage = questions.filter((questionLanguage) => {
    if (selectedLanguage === "All") {
      return true;
    }
    return questionLanguage.languages.includes(selectedLanguage);
  });

  useEffect(() => {
    getAllQuestions();
    getAllUsers()
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
      <h1>FEEEEED👋🏼</h1>

      {users.map((oneUser)=> {
        return (
          <div key={oneUser._id}>
            <h1>{oneUser.username}</h1>
          </div>
        )
      })}

      <div>
        <label>
          Filter by Language
          <select
            name="languages"
            value={selectedLanguage}
            onChange={handleFilter}
          >
            <option value="All">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="C#">C#</option>
          </select>
        </label>
      </div>
      <div>
        <Link to={"/questions/new"}>
          <button>+</button>
        </Link>
      </div>
      <div>
        <ul className="post">
          {filteredLanguage &&
            filteredLanguage.map((question) => {
              return (
                <li key={question._id}>
                  <div>
                    <div>
                      <Link to={`/feed/${question._id}`}>
                        <img src={question.owner.photo} />
                        <h4>{question.owner.username}</h4>
                        <h3>{question.title}</h3>
                        <p>{question.text}</p>
                        <img src={question.image} />
                      </Link>
                    </div>
                    <div>
                      <Link to={`/feed/${question._id}`}>
                        <button>Answers({question.answers.length})</button>
                      </Link>
                      <button>Share</button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      </div>
    </>
  );
};
export default Feed;
