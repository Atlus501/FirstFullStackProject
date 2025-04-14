import React from 'react'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'

import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import './App.css';

//this is the function that creates the app
function App() {
  return (
    <div className="App">
      <Router>

        <div className = "navBox">
          <Link to = "/" className = "navLink">Login In</Link>
          <Link to = "/createAccount" className = "navLink">Create Account</Link>
        </div>

        <Routes>
          <Route path = "/" element = {<Login/>}/>
          <Route path = "/createAccount" element = {<CreateAccount/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
