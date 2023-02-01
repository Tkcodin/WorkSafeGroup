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
  const [likes, setLikes] = useState(0);  // new
  const [liked, setLiked] = useState(false); // new
  
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
        setLikes(data.likes); // new

        })
      
      .catch(error => {console.log(error);console.log(objectId.id)});
    });
   
    // new
    const handleLike = () => {
      setLiked(!liked);
      if (liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      axios.post('http://localhost:3000/updatelikes/' + objectId.id, {
        likes: likes
      })
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    };

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
            <span> // new
              <i
                className={`fa fa-heart${liked ? '' : '-o'}`}
                onClick={handleLike}
              />
              {likes}
            </span>
          </div>
          <p className="StoryContentDesc">
            {Content}
          </p>
          Tags: {Tags}
        </div>
      </div><Comment/></>
    );
  }

  export default StoryContent;