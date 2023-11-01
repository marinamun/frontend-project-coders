import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/Answer.css"

const AllAnswers = ({ answer, setAnswer }) => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const onSubmit = async (event) => {
    event.preventDefault();

    const image = event.target.image.files[0];
    const formData = new FormData();

    if (image) {
      formData.append("imageUrl", image);
    }
    formData.append("text", answer);

    const currentToken = localStorage.getItem("authToken");

    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/questions/answers/${questionId}/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      )
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((error) => {
        console.log("Error posting answer:", error);
      });

    /* const payload = {text:answer}
        try {
            const currentToken = localStorage.getItem("authToken");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/answers/${questionId}/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                    Authorization: `Bearer ${currentToken}`,
                },
                body: JSON.stringify(payload)
            })
            if (res.status === 201) {
                const parsed = await res.json()
                console.log(parsed, "allAnswers")
                setAnswer(parsed);
        }} catch (error) {
            console.log(error)
        } */
  };

  return (
    <div className="answer-div">
      {/* <h2>Answer</h2> */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Leave it here your Answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          className="answer-input"
        />
        <input type="file" name="image" id="answer-input-file" />
        <button type="submit" className="answer-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default AllAnswers;
