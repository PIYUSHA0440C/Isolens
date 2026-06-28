import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  if(loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister(username, email, bio, password)
    .then(res => {
      console.log(res);
      navigate('/');
    })
  }


  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input 
          onInput={(e) => {setUsername(e.target.value)}}
          type="text" name="username" id="" placeholder='Enter username'/>

          <input 
          onInput={(e) => {setEmail(e.target.value)}}
          type="email" name="email" id="" placeholder='Enter email' />

          <input 
          onInput={(e) => {setBio(e.target.value)}}
          type="text" name="bio" id="" placeholder='Enter Bio' />

          <input 
          onInput={(e) => {setPassword(e.target.value)}}
          type="password" name="password" id="" placeholder='Enter Password' />
          <button className='button primary-button'>Register </button>
        </form>

        <p>Already have an account? <Link className='toggleAuthForm' to="/login">login</Link></p>
      </div>
    </main>
  )
}

export default Register
