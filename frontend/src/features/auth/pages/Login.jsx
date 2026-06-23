import React, { use } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

  const [username, setusername] = useState(null)
  const [password, setPassword] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await axios.post('http://localhost:3000/api/auth/login', {
      username: username,
      password: password
    }, {
      withCredentials: true
    })
      .then((response) => console.log(response.data))
  }

  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => setusername(e.target.value)}
            type="text" name="username" id="" placeholder='Enter email or username' />

          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password" name="password" id="" placeholder='Enter Password' />


          <button>Login </button>
        </form>

        <p>Don't Have an account? <Link className='toggleAuthForm' to="/register">register</Link></p>
      </div>


    </main>
  )
}

export default Login
