import React from 'react';
import './navigationBar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUp from './signUp';


const NavigationBar = () => {

  var modal = document.getElementById('createAccModal');
  var createAccountButton = document.getElementById('createAccountButton2');
 


  function openSignUp () {
    modal.style.display = 'block';
  }

  return (
    <div className="navbar">
      <div className="navbarElement">
        <nav className="nben">
          <Link to="/">Home</Link>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
          <Link to="/CreateStory">Create Story</Link>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
          <Link to="/MainFeed">My Feed</Link>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
          <Link to="/Settings">Settings</Link>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
        <button id = 'createAccountButton'
          onClick = {openSignUp}
        >Create Account</button>
        <SignUp modal={modal}></SignUp>
        </nav>
      </div>
    </div>
  );
};





export default NavigationBar;