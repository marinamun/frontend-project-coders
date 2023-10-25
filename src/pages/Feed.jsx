import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Feed = () => {

  const [questions, setQuestions] = useState([])

  const getAllQuestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/questions`)
      if(response.ok) {
        const allTheQuestions = await response.json()
        setQuestions(allTheQuestions)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllQuestions()
  }, [])

  return (
    <>
      <Navbar/>
      <h1>FEEEEED👋🏼</h1>

      <div>
        <label>
          Search 
          <input />
        </label>
      </div>
      <ul className="post">
        {questions.map(question => (
          <li  key={question._id}>
            <Link to={`/questions/${question._id}`}>
              <img src={question.owner.photo}/>
              <h3>question.title</h3>
              <p>question.text</p>
              <p>question.photo</p>
            </Link>
          </li>
        ))}
      </ul>
      
      
    </>
  );
};
export default Feed;
