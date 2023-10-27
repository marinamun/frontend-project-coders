import React, { useState } from 'react';

function Answers() {
    
  const [answer, setAnswer] = useState('');

  return (
    <div>
      <h2>Answer</h2>
      <textarea
        value={answer}
        onChange={handleTextChange}
        rows="4"
        cols="50"
        placeholder="Your answer here"
      />
      <button onClick={(event) => setAnswer(event.target.value)}>Send</button>
    </div>
  );
}

export default Answers;