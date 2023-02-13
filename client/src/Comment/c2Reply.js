import './Comment2.css';
import React,{Component} from 'react';
import { useState } from "react";
import Comment from './Comment2';

const Reply = (props) => {

    function ReplyPost(e){
        e.preventDefault();
        let a = "testAuthor"
        let t = "testText"
        props.addDadComment(a, t);
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