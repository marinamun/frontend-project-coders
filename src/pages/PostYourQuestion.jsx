import { useState } from "react";
import { useNavigate } from "react-router";

const PostYourQuestions = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [file, setFile] = useState("")


    const onSubmit = async (event) => {
        event.preventDefault()
        const payload = {title, text, file}

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`,{ //do we need /api??
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (response.status === 201){
                const yourQuestion = await response.json()
                navigate("#/yourQuestion") //must create!!!

            }
        } catch(error){
            console.log(error)

        }
    }
  return (
    <>
      <h1>Ask your question!</h1>
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={title}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Text
          <input
            value={text}
            type="text"
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <label>
          Text
          <input
            value={file}
            type=""
            onChange={(event) => setFile(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default PostYourQuestions;
