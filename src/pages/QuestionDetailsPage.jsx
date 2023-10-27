import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllAnswers from "../components/AllAnswers";



const QuestionDetailsPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState();
  const [userAnswers, setUserAnswers] = useState([]);
  const [answer, setAnswer] = useState('');

  const fetchQuestion = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`
      );
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json();
        console.log(parsedFromBackend);
        setQuestion(parsedFromBackend.question);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const fetchAnswers = async () => {
    try {
      const responseFromBackend = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/answers/${questionId}`)
      if(responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json()
        console.log(parsedFromBackend)
      setUserAnswers(parsedFromBackend.userAnswers)
      console.log(parsedFromBackend.userAnswers)
    } else {
      console.error("Failed to fetch answer data")
    }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [questionId]);

  return question ? (
    <>
      <Navbar />
      <h1>Question Details Page</h1>
      <div>
        <h2>{question.title}</h2>
        <p>{question.text}</p>
        <p>{question.owner.username}</p>
        <p>{question.timestamps}</p>
        
        <img src={question.image} />
        </div>
        <AllAnswers answer={answer} setAnswer={setAnswer}/>

      {/*   {console.log(answer)};

        {answer && answer.map((oneAnswer) => (
        <div key={oneAnswer._id}>
          <p>{oneAnswer.text}</p>
          </div> ))} */}

      
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default QuestionDetailsPage;
