import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/Answer.css";

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
  };

  return (
    <div>
      {/* <h2>Answer</h2> */}
      <div className="answer-form">
        <form onSubmit={onSubmit}>
          <div >
            <input
              type="text"
              placeholder="✍🏼Type here your answer"
              value={answer}className="text-input"
              onChange={(event) => setAnswer(event.target.value)}
            />
          </div>
          <div >
            <input type="file" name="image"className="file-input" />
          </div>
          <div>
            <button type="submit" className="send-button">Submit</button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllAnswers;
