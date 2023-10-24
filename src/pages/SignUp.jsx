import { useState } from "react"

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
        const payload = {username, email, password}

        try {
            const response = await fetch (`${import.meta.env.VITE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            if (response.status === 201) {
                const parsed = await response.json()
                console.log(parsed)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input value={username} onChange={event => setUsername(event.target.value)} required />
            </label>
            <label>
              Email
              <input value={email} onChange={event => setEmail(event.target.value)} required />
            </label>
            <label>
              Password
              <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                type='password'
              />
            </label>
            <button type='submit'>Register</button>
          </form>
        </>
      )
    }
    
    export default SignUp