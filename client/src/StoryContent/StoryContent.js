import React,{Component,useState,useEffect} from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import './StoryContent.css';
import lake from './lake.jpg';
import axios from 'axios';
import NavigationBar from '../navigationBar';
import Comment from '../Comment/Comment.js'
import MyTagContainer from '../components-tom/MyTag/MyTagContainer';
import MyTag from '../components-tom/MyTag/MyTag';
import CommentSection from '../Comment/commentSection';
import CommentOnStory from '../Comment/commentOnStory';



const StoryContent = () => {
  const  objectId  = useParams();
  const [Author, setAuthor] = useState('');
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Content, setContent] = useState('');
  const [Image, setImage] = useState('');
  const[Tags,setTags] = useState([]);
  const[Date,setDate]=useState('');
  const [likes, setLikes] = useState(0);  
  const [comment, setComment] = useState("Please input your comment...33");
  const [comments, setComments] = useState([]);
  //const [liked, setLiked] = useState(false); 
  const [liked, setLiked] = useState(
    localStorage.getItem(`liked-${objectId.id}`) === 'true'
  );
  const [OpenReply, setOpenReply] = useState(false);
  const [showButton, setShowButton] = useState(true);

  var modal2 = document.getElementById('logInModal');

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
        setComments(data.Comments);
        console.log(data.Comments);
        console.log(comments);
        // setTags(data.tags);
        setDate(data.Date);
        axios.get('http://localhost:3000/populatedTags/'+objectId.id)
        .then(response => {
          console.log(response.data)
          setTags(response.data);
        })
        .catch(error => {
          console.log(error);
        });
        })
      
      .catch(error => {console.log(error);console.log(objectId.id)});
    },[]);
   
    
    const handleLike = () => {
      if (localStorage.getItem('userID') !== null) {
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
      } else {
        modal2.style.display ='block';
      }
      
    };
    
    const tags1 = Tags.map(tag => tag.Name).join(', ');

    const onChangeHandler = (e) => {
      setComment(e.target.value);
     
    };


    const addComment = (t) => {
      // let te = document.getElementById("commentOnStory").value;
      console.log(t);
      setComment(t);
      
    //   addCommentPartTwo();
    // }
     
    // const addCommentPartTwo = () =>{
      console.log("comment: " + comment);
      const newComment = {
        // setComment(t),
        Text: t,
        User: localStorage.getItem("FirstName"),
        Date: new window.Date()
        };
  
        axios
        .post('http://localhost:3000/newComment/' + objectId.id, newComment)
        .then(response => {
          console.log("id: "+objectId.id);
          console.log("comment"+newComment);
        console.log(response.data);
        setComments([...comments, response.data]);
        setComment("");
        // window.location.reload();
        })
        .catch(error => {
        console.log(error);
    
    });
  }
    // const handleButtonClick = () => {
    //   setShowButton(false);
    // };
    // const onClickHandler = (e) => {

    //   e.preventDefault();
    //       const variables = {
    //     responseTo: props.comment._id,
    //     content: Comment
    // }
    
    
    
      
    //   });

    // };

    const openReply=()=> {
      setOpenReply(!OpenReply)
  }


  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
]

return (
  <>
      <NavigationBar />
      <div className="story-page">
        <div className="story-page-wrapper">
          <div className="story-page-title">
            {Title}
          </div>
          <div className="story-page-info">
            Posted by <span className="story-page-author">{Author}</span> on {Date}
          </div>
          <div className="story-page-content">
            <div className="story-page-image">
              <img
                src={"http://localhost:3000/" + Image}
                alt="image" />
            </div>
            <div className="story-page-text">
              {Content}
            </div>
          </div>
          <div className="story-page-tags">
            <span className="story-page-tags-label">Tags:</span> {tags1}
          </div>
          <div className="story-page-actions">
            {liked ?
              <button
                className="story-page-button like-button"
                onClick={handleLike}
              > I Like it! </button>
              :
              <button
                className="story-page-button2 like-button"
                onClick={handleLike}
              > Like it? </button>}
          </div>
          <CommentOnStory addComment={(t) => addComment(t)} />
          <div className="story-page-comments">
            <div className="story-page-comments-title">
              Comments
            </div>
            <CommentSection />
          </div>
        </div>
      </div>
    </>
);
  }

  export default StoryContent;