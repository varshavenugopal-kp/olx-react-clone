import React, { useState,useContext } from 'react';
import { firebaseContext } from '../../store/FirebaseContext'; 
import Logo from '../../olx-logo.png';
import './Login.css';
import {Link,useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'

function Login() {
  const navigate=useNavigate()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const {db,auth}=useContext(firebaseContext)
  const handleLogin=(e)=>{
   e.preventDefault()
   signInWithEmailAndPassword(auth,email,password).then((data)=>{
    navigate('/')
   }).catch((error)=>{
    alert(error.message)
   })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a type='button' onClick={()=>{
              navigate('/signup')
            }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
