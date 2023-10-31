import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllAnswers from "../components/AllAnswers";

const QuestionDetailsPage = () => {
  const navigate = useNavigate();
  const { questionId, answerId } = useParams();
  //const { answerId } = useParams();
  const [question, setQuestion] = useState();
  //const [userAnswers, setUserAnswers] = useState([]);
  const [answer, setAnswer] = useState("");

  const fetchQuestion = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`
      );
      if (responseFromBackend.status === 201) {
        const parsedFromBackend = await responseFromBackend.json();
        console.log(parsedFromBackend);
        setQuestion(parsedFromBackend.question);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* const fetchAnswers = async () => {

    try {
      const responseFromBackend = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/answers/${answerId}`)
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
  } */

  const deleteQuestion = async () => {
    const currentToken = localStorage.getItem("authToken");
    console.log('heee')
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`,
        {
          method: "DELETE",
          /* headers: {
            Authorization: `Bearer ${currentToken}`,
          }, */
        }
      ); 
      console.log('the question was deleted')
      navigate("/feed");
    } catch (error) {
      console.log("Question wasn't deleted:", error);
    }
  };

  const deleteAnswer = async (answerId) => {
    //const currentToken = localStorage.getItem("authToken");
    console.log('heee')
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/answers/${answerId}`,
        {
          method: "DELETE"
          /* headers: {
            Authorization: `Bearer ${currentToken}`,
          }, */
        },
        console.log('inside fetch')
      ); 
      console.log('the answer was deleted')
      window.location.reload();
    } catch (error) {
      console.log("Answer wasn't deleted:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
    //fetchAnswers();
  }, [questionId]);

  return question ? (
    <>
      <Navbar />
      <h1>Question Details Page</h1>
      <div>
        <h2>{question.title}</h2>
        <button onClick={deleteQuestion}>Delete</button>
        <p>{question.text}</p>
        <p>{question.owner.username}</p>
        <p>{question.languages}</p>
        <p>{question.timestamps}</p>

        <img src={question.image} />
      </div>
      <AllAnswers answer={answer} setAnswer={setAnswer} />

      {question.answers.map((oneAnswer) => {
        return (
          <div key={oneAnswer._id}>
            <p>{oneAnswer.text}</p>
            <img src={oneAnswer.image} />
            <button onClick={() => deleteAnswer(oneAnswer._id)}>Delete</button>
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
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default QuestionDetailsPage;
