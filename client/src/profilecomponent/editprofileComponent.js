
import React from "react";
import { useEffect, useState } from "react";
import NavigationBar from "../navigationBar";
import './profileComponent.css';
import profilepicture from './profilepic.jpg';
import ImageSelect from '../components-tom/ImageSelect2';
import axios from 'axios';

const EditProfileComponent =()=>{
 //Once we have set up the backend we will use the url params to pass the object id and then use effect hook to grab the user details from DB.
    //const  objectId  = useParams();
    //new image will be sent to the server to update the image on the server side
    const [Image,setImage] = useState();
    //This is just to display image on the client side. profilepicture would be replaced by image retrieved from DB
    const[displayImage,setDisplayImage] = useState(profilepicture);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [Role, setRole] = useState('');
    const [Employer, setEmployer] = useState('');
    const [About, setAbout] = useState('');
    const [Interests, setInterests] = useState('');

    const handleImageChange = (event) =>{
  
            setImage(event.target.files[0]);
            setDisplayImage(URL.createObjectURL(event.target.files[0]));
           
          
    }
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        
      }
      const handleLastNameChange = (event) => {
        setLastName(event.target.value);
      }
      const handleRoleChange = (event) => {
        setRole(event.target.value);
      }
      const handleEmployerChange = (event) => {
        setEmployer(event.target.value);
      }
      const handleAboutChange = (event) => {
        setAbout(event.target.value);
      }
      //This will change as we know if it is passed as an array or string?
      const handleInterestsChange = (event) => {
        setInterests(event.target.value);
      }
       const onPost=()=>{
        //Post new values to the database
       }

      //Load existing values from the database 

      useEffect(()=>{
        let userEmail = localStorage.getItem('userEmail');
        console.log(userEmail);
  
        if(userEmail != 'Email' && userEmail != null) {
          axios.get('http://localhost:3000/getuser/'+userEmail)
          .then(response => {
          const data = response.data;
          console.log(data);
          console.log(data._id);
          localStorage.setItem('userID',data._id); //gets the id of current user and sets to local storage variable
          localStorage.setItem('FirstName',data.FirstName);
          
          setFirstName(data.FirstName);
          setLastName(data.LastName);
          setRole(data.Role);
          setAbout(data.About);
          setInterests(data.Tags);
          setDisplayImage(data.Image);

          })
        }

      },[]);


    return(
        <><></><NavigationBar /> <form onSubmit={onPost}>
            <div className="profileimage">
            
          <img className="profilepic" id="pp" src={"http://localhost:3000/" + displayImage} alt="profilepic"></img> 
          <br></br>
         <label id='imageLabel'>
              Choose an image: 
              <ImageSelect 
              value = {Image}
              onChange={handleImageChange}
             selectedFile = {Image}
             
              />
            </label> 
       <br></br>
        <p className="changeAuthor">First name:<input type="text" value={firstname} onChange={handleFirstNameChange} /></p><br></br>
        <p className="changeAuthor">Last name:<input type="text" value={lastname} onChange={handleLastNameChange} /></p><br></br>
        <p classname="details">Role: <input type="text" value={Role} onChange={handleRoleChange} /></p><br></br>
        <p className="About">About me: <br></br><textarea rows="10" cols="30" value={About} onChange={handleAboutChange} /></p><br></br>
        <p classname ="details">Interests: <input type="text" value={Interests} onChange={handleInterestsChange} /></p>
      
        <button type='submit' id='PostStoryButton'>submit</button>
        </div></form></>
    );
}

export default EditProfileComponent;