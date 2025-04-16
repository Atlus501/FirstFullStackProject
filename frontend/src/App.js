import React, {useState, useEffect} from 'react'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import CreateRecipe from './pages/CreateRecipe'
import SelectRecipe from './pages/SelectRecipe'
import {AuthContext} from './helpers/AuthContext'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import FindRecipes from './pages/FindRecipes'

//this is the function that creates the app
function App() {

  const[authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logout = () =>{
    setAuthState({username: "", id: 0, status: false});
    localStorage.removeItem("accessToken");
  }

  useEffect(() => {
    axios.get("http://localhost:3001/users/auth", {headers: {
      accessToken: localStorage.getItem("accessToken")}}).then((response) => {
      
      if(!response.data.error){
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        return;
      }
      setAuthState({...authState, status: false});
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value = {{authState, setAuthState}}>
      <Router>
        <div className = "navBox">
          {!authState.status ? (
            <>
              <Link to = "/" className = "navLink">Login</Link>
              <Link to = "/createAccount" className = "navLink">Create Account</Link>
            </>) : (<>
              <Link to = "/authed" className = "navLink">Create Recipe</Link>
              <Link to = "/" className = "navLink" onClick = {logout}>Logout</Link>
              <Link to = "/authed/search" className = "navLink">Find Recipes</Link>
            </>
        )
          }
        </div>

        <Routes>
          <Route path = "/" element = {<Login/>}/>
          <Route path = "/createAccount" element = {<CreateAccount/>}/>
          <Route path = "/authed" element = {<CreateRecipe/>}/>
          <Route path = "/authed/search" element = {<FindRecipes/>}/>
          <Route path = "/authed/search/:id" element = {<SelectRecipe/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
