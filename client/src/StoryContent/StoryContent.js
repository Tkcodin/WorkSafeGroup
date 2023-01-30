import React,{Component,useState,useEffect} from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import './StoryContent.css';
import lake from './lake.jpg';
import axios from 'axios';
import NavigationBar from '../navigationBar';
import Comment from '../Comment/Comment.js'

const StoryContent = () => {
  const  objectId  = useParams();
  const [Author, setAuthor] = useState('');
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Content, setContent] = useState('');
  const [Image, setImage] = useState('');
  const[Tags,setTags] = useState('');
  const[Date,setDate]=useState('');

  
    useEffect(() => {
      const id = objectId;
      axios.get('http://localhost:3000/getmycontent/'+objectId.id)
      .then(response => {
        const data = response.data;
        console.log(data);
        
        setAuthor(data.Author);
        setTitle(data.Title);
        setDescription(data.Description);
        setContent(data.Content);
        setImage(data.Image);
        setTags(data.tags);
        setDate(data.Date);
        

        })
      
      .catch(error => {console.log(error);console.log(objectId.id)});
    });
   
    return (
      

      <><NavigationBar /><div className="StoryContent">

        <div className="StoryContentWrapper">
          <img
            className="StoryContentImg"
            src={"http://localhost:3000/" + Image}
            alt="image" />
          <h1 className="StoryContentTitle">
            {Title}
          </h1>
          <div className="StoryContentInfo">
            <span>
              Author:
              <b className="StoryContentAuthor">
                {Author}
              </b>
            </span>
            <span>{Date}</span>
          </div>
          <p className="StoryContentDesc">
            {Description}
            <br />
            <br />
            {Content}
          </p>
          Tags: {Tags}
        </div>
      </div><Comment/></>
    );
  }

  export default StoryContent;