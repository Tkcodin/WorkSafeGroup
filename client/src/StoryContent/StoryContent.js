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
  const [likes, setLikes] = useState(0);  
  const [comment, setComment] = useState("Please input your comment...");
  const [comments, setComments] = useState([]);
  //const [liked, setLiked] = useState(false); 
  const [liked, setLiked] = useState(
    localStorage.getItem(`liked-${objectId.id}`) === 'true'
  );
  
  useEffect(() => {
    localStorage.setItem(`liked-${objectId.id}`, liked);
  }, [liked]);

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
   
    
    const handleLike = () => {
      if (liked) {
        setLiked(false);
        axios.post('http://localhost:3000/updatelikes/' + objectId.id, {
        likes: -1
      })
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
      } else {
        setLiked(true);
        axios.post('http://localhost:3000/updatelikes/' + objectId.id, {
        likes: 1
      })
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
      }
    };
    const onChangeHandler = (e) => {
      setComment(e.target.value);
     
    };
    const onClickHandler = (e) => {

      e.preventDefault();
    //   const variables = {
    //     responseTo: props.comment._id,
    //     content: Comment
    // }

      setComments((comments) => [...comments, comment]);
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
          </div>
          <p className="StoryContentDesc">
            {Content}
          </p>
          Tags: {Tags}
        </div>
            <div>
              <button
                className="like-button"
                onClick={handleLike}
              >
              {liked ? "I like it!" : "Like it?"}
              </button>
            </div>
            <div className="main-container">
        <div className="comment-flexbox">
          <h3 className="comment-text">Comment</h3>
          <textarea

            value={comment}
            // value={props.comment.content}
            // key={index} 
            onChange={onChangeHandler}
            className="input-box"
          />
          <button onClick={onClickHandler} className="comment-button">
            Submit
          </button>
          {comments.map((text) => (

        <Comment text={text}/>

          ))}
          
      </div></div>
      
      </div>
      
      </>
    );
  }

  export default StoryContent;