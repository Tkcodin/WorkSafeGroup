import React,{Component} from 'react';
import './StoryContent.css';
import lake from './lake.jpg';


export default function StoryContent() {
    return (
      <div className="StoryContent">
        <div className="StoryContentWrapper">
          <img
            className="StoryContentImg"
            src={lake}
            alt="lake"
          />
          <h1 className="StoryContentTitle">
            Amy's Story
          </h1>
          <div className="StoryContentInfo">
            <span>
              Author:
              <b className="StoryContentAuthor">
              
              </b>
            </span>
            <span>1 hour ago</span>
          </div>
          <p className="StoryContentDesc">
         Hello
            <br />
            <br />
            World
          </p>
        </div>
      </div>
    );
  }