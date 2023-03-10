import React,{Component} from 'react';
import R from './R.jpg';
import './StoryCSS.css';
// import '/Users/tuteredurie/WorkSafeGroup/client/src/MainFeed.css';
import ImageSelect from '../components-tom/ImageSelect.js';
import MyTagContainer from '../components-tom/MyTag/MyTagContainer';
import MyTag from '../components-tom/MyTag/MyTag';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class Story extends React.Component{
    
    constructor(props) {
        super(props);
        
        this.handleAuthorClick = this.handleAuthorClick.bind(this);

        this.state = {
          likes: 0,
          comments: -1,
          category: "",
          tags1:""
        };
      }

      componentDidMount() {
        axios.get('http://localhost:3000/getMyLikes/'+this.props.objectid)
          .then(res => {
            this.setState({
              likes: res.data.Likes,
              comments: res.data.Comments.length,
              category: res.data.Category
            }, () => {
              console.log('Likes: ', this.state.likes);
              console.log('Comments: ', this.state.comments);
              console.log('Category: ', this.state.category);
            });
          })
          .catch(error => console.log('ABC: ',error));
      }

      handleAuthorClick (e) {
        // if (!e) var e = window.event;
        // e.cancelBubble = true;
        // if (e.stopPropagation) e.stopPropagation();
        // window.location = '/profileComponent/'
        e.stopImmediatePropagation();
      }

    render(){
       
        const tags = new Array();
        let count = 0;

        //PUT MYTAGS INTO MYTAGCONTAINER
        const readTags  = (s) =>{
          s.map(option=>{
           
            tags.push({id: {count}, tag: <MyTag colour={option.Color} text={option.Name}/>});
                count++;
          })
          this.state.tags1=tags.map(tag=>tag.tag);
          // console.log("READING TAGS FROM: " + s);
          //   s = s.substring(0, s.length - 1);
          //   if(s.length>0){
          //   // console.log("s for split: " + s)
          //  let infos = s.split(",");
          //  for (let i = 0; i<infos.length; i = i+2){
          //   let c = infos[i];
          //   let t = infos[i+1];
            
          //   // tags.push({id: {count}, tag: <MyTag colour={c} text={t}/>});
          //   tags.push(<MyTag colour={c} text={t}/>);
         
          //   }   
        // }
        }
        const handleCardClick = (objectid) => {
            // code to run when the div is clicked
            
          window.location = '/StoryContent/'+objectid;

          }

          

        return(
            
            // console.log(this.props.tagInfo),
            
            console.log("scpre: " + this.props.Score),
            readTags(this.props.tagInfo),
            <div className={`Storydiv ${this.props.Category === 'Question' ? 'Question' : 'Story'}`} onClick={() => handleCardClick(this.props.objectid)}>

              <div className="card-header">
           

              
                <MyTagContainer myTags={this.state.tags1}/>

                <h3 className="title">{this.props.Storyname}</h3>
              </div>
              <div className="card-body">
                <p className="description">{this.props.Description}</p>
                <div className="author"> <b>Author:{" "}</b>
                  <Link to={"/profileComponent/" + this.props.selectedUserID} onClick={this.handleAuthorClick}>
                    {this.props.Author}
                  </Link>
                </div>
                <img src={this.props.Image} className="img" alt="Story.img"/>
              </div>
              <div className="card-footer">
                <div className="category">{this.props.Category}</div>
                <div className="likes-and-comments">
                  <div className="likes">Likes: {this.props.Likes}</div>
                  <div className="comments">Comments: {this.state.comments}</div>
                </div>
                <div className="score">Score: {this.props.Score}</div>
              </div>
            </div>
            

        );
       
    }

   
   
}



