import React from 'react';
//import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Routes} from 'react-router';
import aaa from './aaa';

const NavigationBar = () => {
  return (
    <nav>
      <Router>
          <Link to="/aaa">aaa</Link>
          <Routes>
            <Route path="/aaa" component={aaa} />
          </Routes>
      </Router>
      
      <Router>
          <Link to="/aaa">aaa</Link>
          <Routes>
            <Route path="/aaa" component={aaa} />
          </Routes>
      </Router>
    </nav>
  );
};

export default NavigationBar;