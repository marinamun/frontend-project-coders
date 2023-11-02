import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {  Link } from "react-router-dom";
import "../pages/Feed.css"


const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");

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

        <div className="postsCtn">
          <div className="headerAllPostsCtn">
            <div className="filterBox">
              <label>
                <select className="btn"
                  name="languages"
                  value={selectedLanguage}
                  onChange={handleFilter}
                >
                  <option className="select-btn" value="All">All Languages</option>
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
                <button className="btn-question">Add a question</button>
              </Link>
            </div>
          </div>

          <div>
            <ul >
              {filteredLanguage &&
                filteredLanguage.map((question) => {
                  return (
                    <li key={question._id}>
                      <div className="onePost">
                        <div className="headerPostCtn">
                          <img id="imgPostUser" src={question.owner.photo} alt="profile photo" />
                          <h3>{question.title}</h3>
                        </div>
                        <div className="bodyPostCtn">
                            <p>{question.text}</p>
                            <img id="file" src={question.image} />
                        </div>
                        <div className="footerPostCtn">
                          <Link to={`/feed/${question._id}`}>
                            <button className="btn">Answers ({question.answers.length})</button>
                          </Link>
                          <button className="btn">Share</button>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="userCtn">
          {users.map((oneUser)=> {
          return (
            <div key={oneUser._id}>
              <Link to={'/users'}>
              <img id="imgUser" src={oneUser.photo} alt="profile photo"/>
              <h1>{oneUser.username}</h1>
              </Link>
            </div>
          )
        })}
        </div>

      </div>
    </>
  );
};
export default Feed;
