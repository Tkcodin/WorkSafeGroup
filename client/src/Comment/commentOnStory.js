import CommentTree from './Comment2Tree.js';
import Comment from './Comment2';
import './Comment2.css';
import { useState, useEffect } from "react";
// import user from '/Users/tuteredurie/WorkSafeGroup/client/src/user.png';

const CommentOnStory = (props) => {

// const [comment, setComment] = useState("Please input your comment...");
var modal2 = document.getElementById('logInModal');

function ReplyPost(e){
    e.preventDefault();
    if (localStorage.getItem('userID') !== null) {
      let t = document.getElementById("commentInput").value;
      props.addComment(t);
      window.location.reload();
    } else {
      modal2.style.display ='block';
    }  
    
    
}


      return (
        // <div id="cos">
        //     <input type="text" id="c2RInput"></input>
        //     <button id="c2RPost" onClick={(e) => ReplyPost(e)}>Post</button>
        // </div>

        <div id="commentBox">
                {/* <form onSubmit={this.onPost}> */}
                    {/* <img src={user} alt="Icon" id='userIcon' /> */}
                    <input type="text" placeholder='Write a comment...' id='commentInput'
                    // value={this.state.comment}
                    // onChange={this.onChangeComment}
                    />
                    <button type='submit' id='postCommentButton'
                    onClick={(e) => ReplyPost(e)}
                    >Post</button>
                {/* </form> */}
                
            </div>
        
      );
    }
  
export default CommentOnStory;