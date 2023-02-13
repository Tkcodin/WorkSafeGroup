import React,{Component} from 'react';
import { useState, useEffect } from "react";
import './Comment2.css';
import heart from './heart.png';
import Reply from './c2Reply.js'

const Comment = (props) => {

    const tier = props.tier;
    const comments = props.comments;
    const author=props.author;
    const comment=props.text;
   
    const [likeCount, setLikeCount] = useState(0);
    const [replyVisible, setReplyVisible] = useState(false);
    const [commentsExist, setCommentsExist] = useState(false);
    const [bottomMargin, setBottomMargin] = useState(false);
    const [babyReplies, setBabyReplies] = useState(0);
    const [babyComments, setBabyComments] = useState(0);
    const [started, setStarted] = useState(false);
    const [batchUpdate, setBatchUpdate] = useState([]);

    useEffect(() => {
        if (batchUpdate.length > 0) {
            const totalUpdates = batchUpdate.reduce((acc, current) => acc + current, 0);
            console.log(totalUpdates);
            setBabyComments(babyComments+totalUpdates);
            if(tier>0){
                props.updateDadsBabyComments(totalUpdates);
            }
            setBatchUpdate([]);
        }
      }, [batchUpdate]);

    useEffect(() => {
        if (comments && comments.length > 0) {
            setCommentsExist(true);
        }
    }, []);

    useEffect(() => {
        if (!replyVisible && started && tier>0) {
            props.tellReplyOpen.setBabyReplies(props.dadsReplies.babyReplies - 1);
        }
      }, [replyVisible]);

    useEffect(() => {
        let bm = 20;
        if(commentsExist){
            bm = bm + comments.length*120;
        }
        if(babyComments > 0){
            bm = bm + babyComments*60;
        }
        if(babyReplies>0){
            bm = bm + babyReplies*60;
        }
        if(replyVisible){
            bm = bm + 60;
        }
        setBottomMargin(bm);
    });

    useEffect(() => {
            if(tier>0){
                console.log("about to call props function");
                let x = 0;
                let cl = 0;
                if(comments && comments.length >0){
                    cl = cl + comments.length;
                    x = x + comments.length;
                }
                console.log("Im tier: " + tier + " with comments: " + cl + " and with BC: " + babyComments);
                props.updateDadsBabyComments(x);
                
                console.log("just called the props function");
            }
      },[comments]); 

      useEffect(() => {
        console.log("testRefresh");
      },[babyComments]);

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

    function addComment(a, t){
        let ti = tier+1;
        comments.push({author: a, text: t, tier: ti});
        this.return();
    }
   
    return(
        //className={replyVisible ? (commentsExist ?'with-reply comments' : 'with-reply') : (commentsExist ? 'comments' : '')}
        <div id="comment2" style={{ marginLeft: `${tier * 30}px`, marginBottom: bottomMargin}}> 
            <p className="comment2Comment">
                {comment}
            </p>
            <div id="comment2Bar">
                <label id="comment2Author">{author}</label>
                <img id="comment2Heart" src ={heart} onClick={(e) => HeartClick(e)}></img>
                <label>{likeCount}</label>
                {commentsExist && <label>C: {comments.length}</label>}
                <label>BC: {babyComments}</label>
                <button id="comment2ReplyButton" onClick={(e) => ReplyClick(e)}>R</button>
            </div>
            {replyVisible && <Reply addDadComment = {(a, t) => addComment(a, t)} hide={{setReplyVisible}} />} 
            <br></br>
            {commentsExist && <div id="c2TreeV">
                    {comments && comments.length > 0 && comments.map((comment, index) => (
                        <Comment key = {index} author = {comment.author} text = {comment.text} tier={tier+1} 
                        tellReplyOpen={{setBabyReplies}} dadsReplies={{babyReplies}}
                        updateDadsBabyComments={(n) => updateBabyComments(n)}
                        getDadsBabyComments={getBabyComments}
                        comments = {tier < 3 ? comments : null}
                        /> 
                    ))}
            </div>}
        </div>
    )
}

export default Comment