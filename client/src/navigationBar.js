import React, { useEffect, useState } from 'react';
import './navigationBar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



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

  const amIloggedin = LoggedIn();
  

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
          <Link id="linkToChange" to="/Settings">
            {amIloggedin ? "Settings" : "Log In / Sign Up" }
          </Link>
        </nav>
      </div>
    </div>


    


  );
};


 


export default NavigationBar;