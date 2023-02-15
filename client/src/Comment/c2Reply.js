import './Comment2.css';
import React,{Component} from 'react';
import { useState } from "react";
import Comment from './Comment2';
import axios from 'axios';
import { renderMatches, useParams } from 'react-router-dom';

const Reply = (props) => {

    const  objectId  = useParams();

    function ReplyPost(e){
        e.preventDefault();
        let t = document.getElementById("c2RInput").value;
        console.log(t);
        const newComment = {
            
            // setComment(t),
            Text: t,
            User: 'sam', //localStorage.getItem("FirstName"),
            Date: new window.Date()
            };
      
            axios
            .post('http://localhost:3000/newComment2/' + props.commentID, newComment)
            .then(response => {
              console.log("id: "+props.commentID);
              console.log("comment"+newComment);
              console.log(response.data);
            
            window.location.reload();
            })
            .catch(error => {
            console.log(error);
        
        });


    }

    function ReplyCancel(e){
        e.preventDefault();
        props.hide.setReplyVisible(false);
    }

    return(
       
        <div id="c2Reply">
            <input type="text" id="c2RInput"></input>
            <button id="c2RPost" onClick={(e) => ReplyPost(e)}>Post</button>
            <button id="c2RCancel" onClick={(e) => ReplyCancel(e)}>Cancel</button>
        </div>
        
    )
}

export default Reply