import React from 'react';
import './navigationBar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const NavigationBar = () => {
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
    </div>
  );
};

export default NavigationBar;