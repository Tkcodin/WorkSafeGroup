import React,{Component} from 'react';
import R from './R.jpg';
import './StoryCSS.css';


export default class Story extends React.Component{
    render(){
        return(
            <div className='Storydiv'>
                <h3>{this.props.Storyname}</h3>
                <h3>{this.props.Description}</h3>
                <img src={R} className = "img" alt="Story.img"/>
            </div>

        );
    }
}

