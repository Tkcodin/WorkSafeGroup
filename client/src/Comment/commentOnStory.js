import CommentTree from './Comment2Tree.js';
import Comment from './Comment2';
import './Comment2.css';
import { useState, useEffect } from "react";

const CommentOnStory = (props) => {

// const [comment, setComment] = useState("Please input your comment...");

function ReplyPost(e){
    e.preventDefault();
    let t = document.getElementById("commentOnStory").value;
    console.log("message: " +t)
    props.addComment(t);
}
      return (
        <div id="cos">
            <input type="text" id="commentOnStory"></input>
            <button id="c2RPost" onClick={(e) => ReplyPost(e)}>Post</button>
        </div>
      );
    }
  
export default CommentOnStory;