import React,{Component} from 'react';
import { useState } from "react";
import './Comment.css';
import heart from './heart.png';


const Comment = (props) => {

    const [comment, setComment] = useState("Please input your comment...");
    const [comments, setComments] = useState([]);
  
    const onClickHandler = () => {
      setComments((comments) => [...comments, comment]);
    };
    const onChangeHandler = (e) => {
      setComment(e.target.value);
    };
    
    
    return (
        <div className="main-container">
        <div className="comment-flexbox">
          <h3 className="comment-text">Comment</h3>
          <textarea
            value={comment}
            onChange={onChangeHandler}
            className="input-box"
          />
          <button onClick={onClickHandler} className="comment-button">
            Submit
          </button>
          {comments.map((text) => (
          <><><div className="comment-container">{text}</div>
          <img className="img" src={heart} height="20px" width="20px"></img></>
          <div className='reply'>reply</div></>
        ))}
        </div>
      </div>
    )
}

export default Comment;


