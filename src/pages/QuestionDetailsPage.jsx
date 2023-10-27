import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const QuestionDetailsPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState();

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

  useEffect(() => {
    fetchQuestion();
  }, []);

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
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default QuestionDetailsPage;
