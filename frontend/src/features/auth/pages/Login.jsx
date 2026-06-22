import React from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'

const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form >
          <input type="text" name="username" id="" placeholder='Enter email or username' />
          <input type="password" name="password" id="" placeholder='Enter Password' />
          <button>Login </button>
        </form>

        <p>Don't Have an account? <Link className='toggleAuthForm' to="/register">register</Link></p>
      </div>


    </main>
  )
}

export default Login
