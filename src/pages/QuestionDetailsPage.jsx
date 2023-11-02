import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllAnswers from "../components/AllAnswers";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../pages/QuestionDetailsPage.css"

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
        },
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
      <h1></h1>
      <div className="container">
        <div className="qustion-parent">
          <h5>Number of answers:{answerNumber}</h5>
          <h2>{question.title}</h2>
          <div className="question-header">
            <img src={question.image} className="question-img" />
            {user.userId === question.owner._id ? (
              <button onClick={deleteQuestion} className="question-button">
                Delete
              </button>
            ) : null}
            <div className="question-text">
              <p>{question.owner.username}</p>
              <p>{question.languages}</p>
              <p>{question.text}</p>
              <p>{question.timestamps}</p>
            </div>
          </div>
        </div>
        <AllAnswers answer={answer} setAnswer={setAnswer} />

        {question.answers.map((oneAnswer) => {
          return (
            <div className="question-answer" key={oneAnswer._id}>
              <img id="question-img" src={oneAnswer.image} />
              <p className="answer-text">{oneAnswer.text}</p>
              {console.log(question)}
              {user.userId === oneAnswer.owner ? (
                <button
                  className="question-deleteBtn"
                  onClick={() => deleteAnswer(oneAnswer._id)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          );
        })}
        {/*   {console.log(userAnswers)}
         {console.log(answer)}

          {userAnswers && userAnswers.map((oneAnswer)=>{
            <div key={oneAnswer._id}>
              return (
            <p>{oneAnswer.text}</p>
            )
            </div>
            
          })} */}
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default QuestionDetailsPage;
