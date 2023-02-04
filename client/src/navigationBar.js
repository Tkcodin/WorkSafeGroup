import React, { useEffect, useState } from 'react';
import './navigationBar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUp from './signUp';


const LoggedIn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const confirmLI = localStorage.getItem("loggedIn");
    if(confirmLI==='y'){
      console.log("you are logged in");
      setLoggedIn(true);
    }
    else{
      console.log("you are not logged in");
      setLoggedIn(false);
    }
  }, []); 
   
  return isLoggedIn;
};


const NavigationBar = () => {

//conflicts were here

  const amIloggedin = LoggedIn();
  

  var modal = document.getElementById('createAccModal');
  var createAccountButton = document.getElementById('createAccountButton2');
 


  function openSignUp () {
    modal.style.display = 'block';
  }

//to here I've added both my code and main's hopefully no fuck ups but if there are please check the above section


  return (
    console.log("logged in: " + amIloggedin),
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
          <Link id="linkToChange" to={amIloggedin ? "/Settings" : "/LogIn"}>
            {amIloggedin ? "Settings" : "Log In / Sign Up" }
          </Link>
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