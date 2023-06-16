import React, { useContext } from 'react';
import { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { firebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { addDoc,collection } from 'firebase/firestore';
import {Link,useNavigate} from 'react-router-dom'

export default function Signup() {
  const navigate=useNavigate()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const {db,auth}=useContext(firebaseContext)
  

  const handleSubmit=(e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth,email,password).then((res)=>{
      updateProfile(res.user,{displayName:username}).then(()=>{
        addDoc(collection(db,'users'),
        {id:res.user.uid,
        username:username,
        phone:phone
      }).then(()=>{
        navigate('/login')
      })
      })
      console.log(res.user.uid);
    }).catch(err=>{
      console.log(err);

    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
