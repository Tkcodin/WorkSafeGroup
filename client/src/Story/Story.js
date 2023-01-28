import React,{Component} from 'react';
import R from './R.jpg';
import './StoryCSS.css';
import ImageSelect from '../components-tom/ImageSelect.js';
import MyTagContainer from '../components-tom/MyTag/MyTagContainer';
import MyTag from '../components-tom/MyTag/MyTag';

export default class Story extends React.Component{
    render(){
        
        const tags = [];
        //PUT MYTAGS INTO MYTAGCONTAINER
        const readTags  = (s) =>{
            console.log("s for split: " + s)
           let infos = s.split("-");
           for (let i = 0; i<infos.length; i = i+2){
            let c = infos[i].toString();
            let t = infos[i+1].toString();
            tags.push(<MyTag colour={c} text={t}/>);
           }
        }

        return(
            console.log(this.props.tagInfo),
            readTags(this.props.tagInfo),
            <div className='Storydiv'>
                <MyTagContainer myTags={tags}/>
                <h3 className="title">{this.props.Storyname}</h3>
                <h3 className="description">{this.props.Description}</h3>
                {/* <img src={R} className = "img" alt="Story.img"/> */}
                <ImageSelect />
            </div>

        );
    }
}


