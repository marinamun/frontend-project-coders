import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const QuestionDetailsPage = () => {
  const { fetchWithToken } = useContext(AuthContext);

  useEffect(() => {
    fetchWithToken("/questions/new", (parsed) => {
      console.log(parsed);
    });
  }, []);

  const { questionId } = useParams();
  const { profileId } = useParams();

  const [question, setQuestion] = useState();
  const [user, setUser] = useState();

  const fetchQuestion = async () => {

    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`
      );
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json();
        setQuestion(parsedFromBackend.question);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/${profileId}`
      );
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json();
        setUser(parsedFromBackend.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);
  useEffect(() => {
    fetchUser();
  }, []);

  return question ? (
    <>
      <h1>Question Details Page</h1>
      <div>
        <h2>{question.title}</h2>
        <p>{question.text}</p>
        <p>{user.username}</p>
        <p>{question.timestamps}</p>
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default QuestionDetailsPage;
