import React,{Component} from 'react';
import { useState, useEffect } from "react";
import './Comment2.css';
import heart from './heart.png';
import Reply from './c2Reply.js';
import axios from 'axios';

const Comment = (props) => {
    const id = props.id;
    const tier = props.tier;
    // const comments = props.comments;
    const author=props.author;
    const comment=props.text;
    const commentSpace = 140;
    const [likeCount, setLikeCount] = useState(0);
    const [replyVisible, setReplyVisible] = useState(false);
    const [commentsExist, setCommentsExist] = useState(false);
    const [bottomMargin, setBottomMargin] = useState(false);
    const [babyReplies, setBabyReplies] = useState(0);
    const [babyComments, setBabyComments] = useState(0);
    const [started, setStarted] = useState(false);
    const [batchUpdate, setBatchUpdate] = useState([]);
    const [commentCall, setCommentCall] = useState([]);

    

    useEffect(()=> {

        async function fetchData(){
            if(props.id!=null){
                const response = await axios.get('http://localhost:3000/populatedComments/'+props.id);
                console.log("i am in response");
                setCommentCall(response.data.Comments);
               
                // response.data.Comments.map((b) => {
                //     commentCall.push(b) 
                //     setCommentsExist(true);
                // });
            console.log("response data");
            console.log(response.data);
            console.log("rcommentcall: ");
            console.log(commentCall);
            }
        }
        fetchData();
            
    },[])

    //     if(props.id!=null){
    //     console.log(comment + " id: " + props.id);
    //     axios.get('http://localhost:3000/populatedComments/'+props.id)
        
    //     .then(response => {
    //         console.log("im in response");
    //         response.data.Comments.map((b) => {
    //             console.log("ADDING COMMENT TO COMMET CALL")
    //             commentCall.push(b) 
    //     });
    //         console.log("response data");
    //         console.log(response.data);
    //         console.log("rcommentcall: ");
    //         console.log(commentCall);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    // },[])



    useEffect(() => {
        if (batchUpdate.length > 0) {
            const totalUpdates = batchUpdate.reduce((acc, current) => acc + current, 0);
           // console.log(totalUpdates);
            setBabyComments(babyComments+totalUpdates);
            if(tier>0){
                props.updateDadsBabyComments(totalUpdates);
            }
            setBatchUpdate([]);
        }
      });

    useEffect(() => {
        if (commentCall && commentCall.length > 0) {
            setCommentsExist(true);
            // console.log("comment: " + comment);
        }
    });

    


      //how to spread out comments 
    useEffect(() => {
        if(tier>0){
            // console.log("about to call props function");
            let x = 0;
            let cl = 0;
            if(commentCall && commentCall.length >0){
                cl = cl + commentCall.length;
                x = x + commentCall.length;
            }
            //console.log("Im tier: " + tier + " with comments: " + cl + " and with BC: " + babyComments);
            props.updateDadsBabyComments(x);
            
            //console.log("just called the props function");
        }
  },[commentCall]); 

      //how to spread out comments
    useEffect(() => {
        let bm = (commentSpace/4);
        if(commentsExist){
            bm = bm + commentCall.length*(commentSpace);
        }
        if(babyComments > 0){
            bm = bm + babyComments*(commentSpace/2);
        }
        if(babyReplies>0){
            bm = bm + babyReplies*(commentSpace/2.05);
        }
        if(replyVisible){
            bm = bm + (commentSpace/2);
        }
        setBottomMargin(bm);
    });


    useEffect(() => {
        if (!replyVisible && started && tier>0) {
            props.tellReplyOpen.setBabyReplies(props.dadsReplies.babyReplies - 1);
        }
      });

    

    const updateBabyComments = (n) =>{

            setBatchUpdate(prevBatchUpdate => [...prevBatchUpdate, n]);

    };

    const getBabyComments = () => babyComments;

    function HeartClick(e){
        e.preventDefault();
        setLikeCount(likeCount + 1)
    }

    function ReplyClick(e){
        e.preventDefault();
        setStarted(true);
        setReplyVisible(true);
        if(tier>0){
            props.tellReplyOpen.setBabyReplies(props.dadsReplies.babyReplies + 1);
        }
    }

   

    return(
        //className={replyVisible ? (commentsExist ?'with-reply comments' : 'with-reply') : (commentsExist ? 'comments' : '')}
        <div id="comment2" style={{ marginLeft: `${tier * 30}px`, marginBottom: bottomMargin}}> 
            <div id="commentMain">
                <p className="comment2Comment">
                    {comment}
                </p>
                <div id="comment2Bar">
                    <label id="comment2Author">{author}</label>
                    <div id="littlebits">
                        <img id="comment2Heart" src ={heart} onClick={(e) => HeartClick(e)}></img>
                        <label id="likelabel">{likeCount}</label>
                        {/* {commentsExist && <label>C: {commentCall.length}</label>}
                        <label>BC: {babyComments}</label> */}
                        <button id="comment2ReplyButton" onClick={(e) => ReplyClick(e)}>R</button>
                    </div>
                </div>
            </div>
            {replyVisible && <Reply tier={tier} commentID={id} hide={{setReplyVisible}} />} 
            <br></br>
            {commentsExist && <div id="c2TreeV">
                    {commentCall && commentCall.length > 0 && commentCall.map((comment, index) => (
                        <Comment key = {index} id={comment._id} author = {comment.User} text = {comment.Text} tier={tier+1} 
                        tellReplyOpen={{setBabyReplies}} dadsReplies={{babyReplies}}
                        updateDadsBabyComments={(n) => updateBabyComments(n)}
                        getDadsBabyComments={getBabyComments}
                        // comments = {commentCall}
                        /> 
                    ))}
            </div>}
        </div>
    )
}

export default Comment