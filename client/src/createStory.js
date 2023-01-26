import MyTag from './components-tom/MyTag/MyTag.js';
import MakeCommentComponent from "./MakeCommentCOmponent.jsx";
import MyTextBox from './components-tom/MyTextBox/MyTextBox.js';
import { useState } from 'react';
import NavigationBar from './navigationBar';

export const CreateStory = (props) => {
  return(
  <div>
    <NavigationBar />
    <a>
      I AM A NEW PAGE!!!!!
      <MyTag text="violence2" colour="green"/>
      <MyTag text="heights" colour="blue"/>
      <MyTag text="Air Toxins" colour="purple"/>
    </a>
    <MakeCommentComponent> </MakeCommentComponent>
    <MyTextBox prompt="type here: " height="50px" inst="Enter text Here"/>
    <MyTextBox prompt="type here2: " height="200px" inst="Enter text Here2"/>
</div>
);
}
export default CreateStory;