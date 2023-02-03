import React,{Component} from 'react';
import R from './R.jpg';
import './StoryCSS.css';
import ImageSelect from '../components-tom/ImageSelect.js';
import MyTagContainer from '../components-tom/MyTag/MyTagContainer';
import MyTag from '../components-tom/MyTag/MyTag';
import axios from 'axios';


export default class Story extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          likes: 0,
          comments: -1
        };
      }

      componentDidMount() {
        axios.get('http://localhost:3000/getMyLikes/'+this.props.objectid)
          .then(res => {
            this.setState({
              likes: res.data.Likes,
              comments: res.data.Comments.length
            }, () => {
              console.log('Likes: ', this.state.likes);
              console.log('Comments: ', this.state.comments);
            });
          })
          .catch(error => console.log('ABC: ',error));
      }

    render(){
       
        const tags = new Array();
        let count = 0;

        //PUT MYTAGS INTO MYTAGCONTAINER
        const readTags  = (s) =>{
            s = s.substring(0, s.length - 1);
            if(s.length>0){
            // console.log("s for split: " + s)
           let infos = s.split("-");
           for (let i = 0; i<infos.length; i = i+2){
            let c = infos[i];
            let t = infos[i+1];
            
            // tags.push({id: {count}, tag: <MyTag colour={c} text={t}/>});
            tags.push(<MyTag colour={c} text={t}/>);
            count++;
            }   
        }
        }
        const handleCardClick = (objectid) => {
            // code to run when the div is clicked
            
           window.location = '/StoryContent/'+objectid;



          }

        return(
            
            // console.log(this.props.tagInfo),
            

            readTags(this.props.tagInfo),
            <div className='Storydiv' onClick={() => handleCardClick(this.props.objectid)}>

                <MyTagContainer myTags={tags}/>
                <h3 className="title">{this.props.Storyname}</h3>
                <h3 className="description">{this.props.Description}</h3>
                <h3 className="author">{this.props.Author}</h3>
                <img src={this.props.Image} className = "img" alt="Story.img"/>
                <div className="likes-and-comments-container">
                    <h3 className="likes">Likes: {this.state.likes}</h3>
                    <h3 className="comments">Comments: {this.state.comments}</h3>
                </div>
                {/* <img src={R} className = "img" alt="Story.img"/> */}
            </div>
            

        );
       
    }

   
   
}



