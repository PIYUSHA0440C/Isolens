import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/api/auth/register', {
      username: username,
      email: email,
      bio: bio,
      password: password
    }, {
      withCredentials: true
    })
    .then((response) => {
      console.log(response.data);
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
          <button>Register </button>
        </form>

        <p>Already have an account? <Link className='toggleAuthForm' to="/login">login</Link></p>
      </div>
    </main>
  )
}

export default Register
