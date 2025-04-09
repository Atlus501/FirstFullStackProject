import React from 'react'
import Login from './pages/Login'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>

        <div className = "navBox">
          <Link to = "/" className = "navLink">Login In</Link>
        </div>

        <Routes>
          <Route path = "/" element = {<Login/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
