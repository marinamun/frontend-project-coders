import { useEffect, useState } from "react";

const OneQuestion = () => {
  const [question, setQuestion] = useState([]);

  const fetchQuestion = async (req, res) => {
    const { id } = req.params;
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/questions/${id}`
      );
      if (responseFromBackend.ok) {
        const theQuestion = await responseFromBackend.json();
        setQuestion(theQuestion);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      <h1>The specific question</h1>
      {question.map((property) => (
        <div>
          <h3>{property.title}</h3>
          <p>{property.text}</p>
          <img src={property.file}/>
          <button>Delete question</button>
        </div>
        
      ))}
    </>
  );
};
export default OneQuestion;
