import React,{useEffect,useContext} from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import './App.css';
import Signup from './Pages/Signup'
import Create from './Pages/Create'
import Login from './Pages/Login'
import View from './Pages/ViewPost'
import Post from './store/postContext';
import {auth} from './firebase/Config'
import { AuthContext, firebaseContext } from './store/FirebaseContext'; 

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';


function App() {
  const {setUser}=useContext(AuthContext)
  const {db,auth}=useContext(firebaseContext)

   useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
   })
  return (
    <div>
      <Post>
      <Router>
        <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/signup' Component={Signup} />
        <Route exact path='/login' Component={Login} />
        <Route exact path='/create' Component={Create} />
        <Route exact path='/viewpost' Component={View} />
        
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
