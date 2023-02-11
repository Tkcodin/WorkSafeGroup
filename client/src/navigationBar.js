import React, { useRef, useEffect, useState } from 'react';
import './navigationBar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUp from './signUp';
import LogIn from './logIn';


const LoggedIn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const confirmLI = localStorage.getItem("loggedIn");
    if(confirmLI==='y'){
      // console.log("you are logged in");
      setLoggedIn(true);
    }
    else{
      // console.log("you are not logged in");
      setLoggedIn(false);
    }
  }, []); 
   
  return isLoggedIn;
};


const NavigationBar = () => {

//conflicts were here

  const amIloggedin = LoggedIn();
  
  // const modalRef = useRef(null);
  // const modal2Ref = useRef(null);
  var modal = document.getElementById('createAccModal');
  var modal2 = document.getElementById('logInModal');
  var createAccountButton = document.getElementById('createAccountButton2');
  
  const firstName = localStorage.getItem('FirstName');
  // document.getElementById('welcomeMessage').innerHTML = `Welcome, ${firstName}`;

  function openLogIn () {
    modal2.style.display ='block';
  }
  
  function openSettings () {
    window.location= '/Settings';
  }

  
  function openSignUp () {
    modal.style.display = 'block';
  }

  function logout () {
    localStorage.clear();
    alert('You have now been logged out.');
  }

//to here I've added both my code and main's hopefully no fuck ups but if there are please check the above section

if (localStorage.getItem('userID') != null) {
  return (
    // console.log("logged in: " + amIloggedin),
    <div className="navbar">
      {/* <div className="navbarElement">
        <nav className="nben">
          <Link to="/">Home</Link>
        </nav>
      </div> */}
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
          <button id ='loginSettings' 
          onClick = {openSettings}     
          >Settings</button>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
          <p id='welcomeMessage'> {`Welcome, ${firstName}`}</p>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
          <Link to="/MainFeed"
            onClick={logout}
          >Logout</Link>
        </nav>
      </div>
    </div>

  );
} else {
  return (
    // console.log("logged in: " + amIloggedin),
    <div className="navbar">
      {/* <div className="navbarElement">
        <nav className="nben">
          <Link to="/">Home</Link>
        </nav>
      </div> */}
      <div className="navbarElement">
        <nav className="nben">
          <Link to="#"
          onClick = {openLogIn}
          >Create Story</Link>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
          <Link to="/MainFeed">Home Feed</Link>
        </nav>
      </div>
      <div className="navbarElement">
        <nav className="nben">
          <button id ='loginSettings' 
            onClick = {openLogIn}>
              Log In / Sign Up
            </button>
            <LogIn modal={modal2} ></LogIn>
            <SignUp modal={modal}></SignUp>
        </nav>
      </div>
      {/* <div className="navbarElement">
        <nav className="nben">
        <button id = 'createAccountButton'
          onClick = {openSignUp}
        >Create Account</button>
        
        </nav>
      </div> */}
    </div>

  );
}
};





export default NavigationBar;