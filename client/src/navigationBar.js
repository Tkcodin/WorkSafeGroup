import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const NavigationBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/CreateStory">Create Story</Link>
    </nav>
  );
};

export default NavigationBar;