import { useEffect, useState } from "react";
import React from "react";
import NavigationBar from "../navigationBar";
import './profileComponent.css';
import profilepicture from './profilepic.jpg';
import { useParams } from "react-router";
import EditProfileComponent from "./editprofileComponent";
import axios from 'axios';
import MyTagContainer from '../components-tom/MyTag/MyTagContainer';
import MyTag from '../components-tom/MyTag/MyTag';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const ProfileComponent =()=>{
    //Once we have set up the backend we will use the url params to pass the object id and then use effect hook to grab the user details from DB.
    //const  objectId  = useParams();
    const [Image, setImage] = useState('');
    const selectedUserID = useParams('').selectedUserID;
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [Role, setRole] = useState('');
    const [Employer, setEmployer] = useState('');
    const [About, setAbout] = useState('');
    //Is it going to be an array or a string from the DB?
    const [Interests, setInterests] = useState('');
    const tags = new Array();


    function handleTags(){
        let s = Interests;
        s = s.substring(0, s.length - 1);
        if(s.length>0){
            let infos = s.split("-");
            for (let i = 0; i<infos.length; i = i+2){
                let c = infos[i];
                let t = infos[i+1];
                tags.push(<MyTag colour={c} text={t}/>);
            }  
        }
    }

    useEffect(()=>{
        // let userID = localStorage.getItem('userID');
        // console.log(userID);
  
        if(selectedUserID != null) {
          axios.get('http://localhost:3000/getuserWithID/'+selectedUserID)
          .then(response => {
          const data = response.data;
          console.log(data);
          console.log(data._id);
          
          setFirstName(data.FirstName);
          setLastName(data.LastName);
          setRole(data.Role);
          setEmployer(data.Employer)
          setAbout(data.About);
          setInterests(data.Tags);
          setImage(data.Image);
            })
        }
    });

    if (selectedUserID === localStorage.getItem('userID')) {
        // console.log('in be edit');
        return (
            <><></><NavigationBar /><div className="profileimage">
            <img className="profilepic" src={"http://localhost:3000/" + Image} alt="profilepic"></img>
            <h1 className="Author">{firstname} {lastname}</h1><br></br>
            <h2 classname="details">{Role} at {Employer}</h2><br></br>
            <p className="About">About me: <br></br>{About}</p><br></br>
            <label>My Interests: </label>
            <div id="tagsInMiddle">
            <MyTagContainer myTags={tags}/>
            </div>
            <br></br>
            <Link to= '/editProfileComponent'>
            <button
            >Edit Profile</button>
            </Link>
            </div></>
        );
    } else {
        handleTags();
        return (
            <><></><NavigationBar /><div className="profileimage">
                <img className="profilepic" src={"http://localhost:3000/" + Image} alt="profilepic"></img>
                <h1 className="Author">{firstname} {lastname}</h1><br></br>
                <h2 classname="details">{Role} at {Employer}</h2><br></br>
                <p className="About">About me: <br></br>{About}</p><br></br>
                <label>My Interests: </label>
                <div id="tagsInMiddle">
                <MyTagContainer myTags={tags}/>
                </div>
                </div></>
        );
    }


}
export default ProfileComponent;