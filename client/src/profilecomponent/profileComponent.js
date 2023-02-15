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
import SignUp from '../signUp.js';


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
    const [Email, setEmail] = useState('');
    //Is it going to be an array or a string from the DB?
    const [Interests, setInterests] = useState([]);
    const [emailPrivate, setEmailPrivate] = useState(false);
    const [rolePrivate, setRolePrivate] = useState(false);
    const [employerPrivate, setEmployerPrivate] = useState(false);
    const tags = new Array();
   

    var modal = document.getElementById('createAccModal');

    function handleTags(){
        // let s = Interests;
        // s = s.substring(0, s.length - 1);
        // if(s.length>0){
        //     let infos = s.split(" ");
        //     for (let i = 0; i<infos.length; i = i+2){
        //         let c = infos[i];
        //         let t = infos[i+1];
        //         tags.push(<MyTag colour={c} text={t}/>);
        //     }  
        // }
        console.log(Interests);
        Interests.forEach(element => {
            tags.push(<MyTag colour={element.Color} text={element.Name}/>);
        });
         
         
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
        //   setInterests(data.Tags);
          setImage(data.Image);
          setEmail(data.Email);
          setEmailPrivate(data.EmailPrivate);
          setRolePrivate(data.RolePrivate);
          setEmployerPrivate(data.EmployerPrivate);
          axios.get('http://localhost:3000/populatedTagsProfile/'+data._id)
          .then(response1=>{
            const data1 = response1.data;
            // let str = '';
            // data1.map(data=>{
            //     str=str +" "+data.Name;
            // })
            setInterests(data1);
          })

            })
        }
    },[]);


        console.log(emailPrivate);
        handleTags();
        return (
            <div className="MainProfileContainer">
              <NavigationBar />
              <div className="overlay"></div>
              <img className="profile-pic" src={"http://localhost:3000/" + Image} alt="Profile Pic" />
              <div className="profile-container">
                <div className="profile-info">
                  <h1 className="author-name">{firstname} {lastname}</h1>
                  <div className="section-container">
                    <div className="section">
                      <h2 className="section-title">Professional Details:</h2>
                      <h3 className="role-title">Role:</h3>
                      <p className="role-text">{rolePrivate ? "Role Hidden" : Role}</p>
                      <h3 className="employer-title">Employer:</h3>
                      <p className="employer-text">{employerPrivate ? "Employer Hidden" : Employer}</p>
                      <h3 className="contact-info-title">Contact Information:</h3>
                      <p className="contact-info-text">{emailPrivate ? "Email Hidden" : Email}</p>
                    </div>
                    <div className="section">
                      <h2 className="section-title">Personal Interests:</h2>
                      <h3 className="about-title">About Me:</h3>
                      <p className="about-text">{About}</p>
                      <h3 className="interests-title">My Interests/Tags:</h3>
                      <div className="interests">
                        <MyTagContainer myTags={tags} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {(selectedUserID === localStorage.getItem('userID')) ? <Link to= '/editProfileComponent' > <button className="editProfileButton">Edit Profile</button></Link> : null }
            </div>
          );     
    }
export default ProfileComponent;