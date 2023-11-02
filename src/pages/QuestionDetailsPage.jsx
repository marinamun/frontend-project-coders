import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllAnswers from "../components/AllAnswers";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../pages/QuestionDetailsPage.css";

const QuestionDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState("");
  const [answerNumber, setAnswerNumber] = useState(0);

  const fetchQuestion = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`
      );
      if (responseFromBackend.status === 201) {
        const parsedFromBackend = await responseFromBackend.json();
        console.log(parsedFromBackend);
        setQuestion(parsedFromBackend.question);
        setAnswerNumber(parsedFromBackend.question.answers.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestion = async () => {
    const currentToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`,
        {
          method: "DELETE",
        }
      );
      console.log("the question was deleted");
      navigate("/feed");
    } catch (error) {
      console.log("Question wasn't deleted:", error);
    }
  };

  const deleteAnswer = async (answerId) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/answers/${answerId}`,
        {
          method: "DELETE",
        }
      );
      console.log("the answer was deleted");
      window.location.reload();
    } catch (error) {
      console.log("Answer wasn't deleted:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  return question ? (
    <>
      <Navbar />
      <h1 id="h1">✅Question details:</h1>
      <div className="question-card">
        <h2>{question.title}</h2>
        <hr />
        <p>
          <em>"{question.text}"</em>
        </p>
        <p>
          About <strong>{question.languages}</strong>
        </p>

        <img src={question.image} />

        {user.userId === question.owner._id ? (
          <button onClick={deleteQuestion} className="delete-btn">
            ❌
          </button>
        ) : null}
        <p id="by">By: {question.owner.username}</p>
      </div>
      {/* <h5>Number of answers:{answerNumber}</h5> */}

      <AllAnswers answer={answer} setAnswer={setAnswer} />
      <div className="answer-card">
        <h1>Read the answers:</h1>
     
        {question.answers.map((oneAnswer) => {
          return (
            <div key={oneAnswer._id}>
              <div className="one-answer">
                <div>
                  <p>{oneAnswer.text}</p>
                  <img src={oneAnswer.image} />
                </div>

                {console.log(question)}
                {user.userId === oneAnswer.owner ? (
                  <button
                    onClick={() => deleteAnswer(oneAnswer._id)}
                    className="delete-btn"
                  >
                    ❌
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default QuestionDetailsPage;
