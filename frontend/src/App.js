import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/User/SignUp/SignUp';
import Login from './components/User/Login/Login';

import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';


function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {


    let token = localStorage.getItem("token")

    if(token != null){
      let user = jwt_decode(token)

      if(user){
        setIsAuth(true)
        setUser(user)
      }
      else if(!user){
        localStorage.removeItem("token")
        setIsAuth(false)
      }
    }
  }, [])


  const registerHandler = (user) => {
    axios.post("http://localhost:5001/users", user)
    .then(res =>{
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  
  const loginHandler = (cred) =>{
    axios.post("http://localhost:5001/auth/signin", cred)
    .then(res =>{
      console.log(res.data.token)

      // Store the token in local storage
      if(res.data.token != null){
        //token is key, res.data.tokem is the value we received
        localStorage.setItem("token", res.data.token)
        //decode the token - we get the user object back, has only the id
        let user = jwt_decode(res.data.token)
        //the user is authenticated - we need to know to display the logout instead of signup and signin
        setIsAuth(true)
        //storing the user object in the state
        setUser(user)
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }


  



  return (
    <Router>
      {/* <NavBar onLogoutHandler = {onLogoutHandler} isAuth={isAuth} user={user} /> */}
    <div className="App">
     <Routes>
     <Route path='/home' element={isAuth ? <HomePage /> : <Login login={loginHandler}/>} />
     <Route path='/signup' element={<SignUp register={registerHandler}></SignUp>} />
     <Route path='/login' element={isAuth ? <HomePage /> : <Login login={loginHandler}/>} />
     <Route path='/' element={<SignUp />} />


     </Routes>
    </div>
    </Router>

    
    
  );
}

export default App;
