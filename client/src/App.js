import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateStory from './createStory.js';
import MainFeed from './MainFeed.js';
import { Home } from './HomePage.js'


function App() {
  return (

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/CreateStory' element={<CreateStory />}></Route>
      <Route path='/MainFeed' element={<MainFeed />}></Route>
    </Routes>

  );

}

export default App;
