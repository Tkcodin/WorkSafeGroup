import React,{Component} from 'react';
import R from './R.jpg';
import './StoryCSS.css';
import ImageSelect from '../components-tom/ImageSelect.js';

export default class Story extends React.Component{
    render(){
        return(
            <div className='Storydiv'>
                <h3 class="title">{this.props.Storyname}</h3>
                <h3 class="description">{this.props.Description}</h3>
                {/* <img src={R} className = "img" alt="Story.img"/> */}
                <ImageSelect />
            </div>

        );
    }
}

