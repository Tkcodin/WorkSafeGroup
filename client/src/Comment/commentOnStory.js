import CommentTree from './Comment2Tree.js';
import Comment from './Comment2';
import './Comment2.css';
import { useState, useEffect } from "react";

const CommentOnStory = (props) => {

// const [comment, setComment] = useState("Please input your comment...");
var modal2 = document.getElementById('logInModal');

function ReplyPost(e){
    e.preventDefault();
    if (localStorage.getItem('userID') !== null) {
      let t = document.getElementById("c2RInput").value;
      props.addComment(t);
    } else {
      modal2.style.display ='block';
    }
    
}

      return (
        <div id="cos">
            <input type="text" id="c2RInput"></input>
            <button id="c2RPost" onClick={(e) => ReplyPost(e)}>Post</button>
        </div>
      );
    }
  
export default CommentOnStory;