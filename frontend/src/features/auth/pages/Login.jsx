import React, { use } from 'react'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'


const Login = () => {

  const [username, setusername] = useState(null)
  const [password, setPassword] = useState(null)

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await handleLogin(username, password)
      .then(res => {
        console.log(res)
        navigate('/')
      })

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


          <button className='button primary-button'>Login </button>
        </form>

        <p>Don't Have an account? <Link className='toggleAuthForm' to="/register">register</Link></p>
      </div>


    </main>
  )
}

export default Login
