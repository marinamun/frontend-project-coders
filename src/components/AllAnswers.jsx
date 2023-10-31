import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AllAnswers = ({answer, setAnswer}) => {
  const navigate = useNavigate()
    const {questionId} = useParams();
    const onSubmit = async event => {
        event.preventDefault();

        const image = event.target.image.files[0];
        const formData = new FormData();

        if (image) {
        formData.append("imageUrl", image);
        }
        formData.append("text", answer);

        const currentToken = localStorage.getItem("authToken");

        axios
        .post(`${import.meta.env.VITE_API_URL}/api/questions/answers/${questionId}/new`, formData, {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          })
          .then((res) => {
            navigate(`/feed/${questionId}`);
            console.log(res)
          })
          .catch((error) => {
            console.log("Error posting answer:", error)
          })

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
    }

  return (
    <div>
        <h2>Answer</h2>
        <form onSubmit={onSubmit}>
      <input type="textarea" value={answer} onChange={(event) => setAnswer(event.target.value)} />
      <input type="file" name="image" />
      <button type='submit'>Send</button>
        </form>
    </div>
  );

}



export default AllAnswers;