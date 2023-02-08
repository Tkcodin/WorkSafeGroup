import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateStory from './createStory.js';
import MainFeed from './MainFeed.js';

import { Home } from './HomePage.js'
import Settings from './settings.js'

import StoryContent from './StoryContent/StoryContent.js';
import ProfileComponent from './profilecomponent/profileComponent';
import EditProfileComponent from './profilecomponent/editprofileComponent';

import LogIn from './logIn.js';

function App() {
  return (

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/CreateStory' element={<CreateStory />}></Route>
      <Route path='/MainFeed' element={<MainFeed />}></Route>
      {/* <Route path='/MainFeed/:Email' element={<MainFeed />}></Route> */}

      <Route path='/Settings' element={<Settings />}></Route>

      <Route path='/StoryContent/:id' element ={<StoryContent/>}></Route>
      {/* //The components will have "/:id" in the end once we are getting object id from other components. - Sapan */}
      <Route path='/profileComponent/:selectedUserID' element = {<ProfileComponent/>}></Route>
      <Route path='/editprofileComponent' element={<EditProfileComponent/>}></Route>

      <Route path='/LogIn' element= {<LogIn/>}></Route>
      <Route path='/StoryContent' element= {<StoryContent/>}></Route>

    </Routes>

  );

}

export default App;
