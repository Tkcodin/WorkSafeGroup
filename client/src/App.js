import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateStory from './createStory.js';
import MainFeed from './MainFeed.js';

import { Home } from './HomePage.js'
import Settings from './settings.js'

import StoryContent from './StoryContent/StoryContent.js';
import ProfileComponent from './profilecomponent/profileComponent';



function App() {
  return (

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/CreateStory' element={<CreateStory />}></Route>
      <Route path='/MainFeed' element={<MainFeed />}></Route>

      <Route path='/Settings' element={<Settings />}></Route>

      <Route path='/StoryContent/:id' element ={<StoryContent/>}></Route>

      <Route path='/profileComponent' element = {<ProfileComponent/>}></Route>

    </Routes>

  );

}

export default App;
