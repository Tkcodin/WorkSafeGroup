import React,{Component} from 'react';
import { useState } from "react";
import './Comment.css';
import heart from './heart.png';
import ReplyComment from './ReplyComment.js'


const Comment = (props) => {

    // const[id,setId] = useState(props.id);
     const [comment, setComment] = useState("Please input your comment...");

    const [comments, setComments] = useState([]);
    const[count,setCount] = useState(0);

    const onChangeHandler = (e) => {
      setComment(e.target.value);
     
    };
    const onClickHandler = (e) => {

      e.preventDefault();
    

      setComments((comments) => [...comments, comment]);
    };

    
    return (
        <div className="comment-flexbox">
          {}
         
           
          
          
          <><div className="comment-container">
             
            {props.text} <div className='count'>{count}</div>
            <div className='heart'> 
            <img className="img1" src={heart} onClick={()=>setCount(count+1)}></img>

            

            </div> 
            <br/>

            {comments.map((text) => (

<><div className='comment-container'><Comment text={comment} /> 
{}
   </div> </>

  ))}

            
           
            {}
            

            </div>
            
      
         </>
          {}
       
        </div>

  

    )
}

export default Comment


