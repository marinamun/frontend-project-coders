import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AllAnswers = ({answer, setAnswer}) => {
    const {questionId} = useParams();
    const onSubmit = async event => {
        event.preventDefault();
        const payload = {text:answer}
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
        }
    }

  return (
    <div>
        <h2>Answer</h2>
        <form onSubmit={onSubmit}>
      <input type="textarea" value={answer} onChange={(event) => setAnswer(event.target.value)} />
      <button type='submit'>Send</button>
        </form>
    </div>
  );

}



export default AllAnswers;