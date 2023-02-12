import React,{Component} from 'react';
import { useState } from "react";
import './Comment.css';
import heart from './heart.png';
import ReplyComment from './ReplyComment.js'


const Comment = (props) => {

     const [comment, setComment] = useState("Please input your comment...");
    const [comments, setComments] = useState([]);
    // const [OpenReply, setOpenReply] = useState(false);
    const[count,setCount] = useState(0);

    // const onChangeHandler = (e) => {
    //   setComment(e.target.value);
     
    // };

    // const onClickHandler = (e) => {

    //   e.preventDefault();
    // //   const variables = {
    // //     responseTo: props.comment._id,
    // //     content: Comment
    // // }

    //   setComments((comments) => [...comments, comment]);
    // };

    const onChangeHandler = (e) => {
      setComment(e.target.value);
     
    };
    const onClickHandler = (e) => {

      e.preventDefault();
    //   const variables = {
    //     responseTo: props.comment._id,
    //     content: Comment
    // }

      setComments((comments) => [...comments, comment]);
    };

  //   const openReply = () => {
  //     setOpenReply(!OpenReply)
  // }

//   const actions = [
//     <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
// ]

    
    return (
        // <div className="main-container">
        <div className="comment-flexbox">
          {/* <h3 className="comment-text">Comment</h3>
          <textarea

            value={comment}
            // value={props.comment.content}
            // key={index} 
            onChange={onChangeHandler}
            className="input-box"
          />
          <button onClick={onClickHandler} className="comment-button">
            Submit
          </button> */}
         
           
          
          
          <><div className="comment-container">
             
            {props.text} <div className='count'>{count}</div>
            <div className='heart'> 
            <img className="img1" src={heart} onClick={()=>setCount(count+1)}></img>

            

            </div> 
            <br/>

            {comments.map((text) => (

<><div className='comment-container'><Comment text={comment} /> 
{/* <button className='reply' onClick={openReply}>reply</button> */}
   </div> </>

  ))}

            
           
            {/* {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onClickHandler}>
                    <textArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onChangeHandler}
                        value={comment}
                        // placeholder="write some comments"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onClickHandler}>Submit</button>
                </form>
            } */}
            

            </div>
            
      
         </>
          {/* </> */}
       
        </div>
      // </div>

  //     <div>
  //     <Comment
  //         actions={actions}
  //         content={
  //             <p>
  //                 {props.comment.content}
  //             </p>
  //         }
  //     ></Comment>


  //     {OpenReply &&
  //         <form style={{ display: 'flex' }} onSubmit={onClickHandler}>
  //             <textArea
  //                 style={{ width: '100%', borderRadius: '5px' }}
  //                 onChange={onChangeHandler}
  //                 value={Comment}
  //                 placeholder="write some comments"
  //             />
  //             <br />
  //             <button style={{ width: '20%', height: '52px' }} onClick={onClickHandler}>Submit</button>
  //         </form>
  //     }

  // </div>

  

    )
}

export default Comment


