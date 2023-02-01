import { useEffect, useState } from "react";
import React from "react";
import NavigationBar from "../navigationBar";
import './profileComponent.css';
import profilepicture from './profilepic.jpg';




const ProfileComponent =()=>{
    //Once we have set up the backend we will use the url params to pass the object id and then use effect hook to grab the user details from DB.
    //const  objectId  = useParams();
    const [firstname, setFirstName] = useState('sapan');
    const [lastname, setLastName] = useState('sandesara');
    const [Role, setRole] = useState('Safety Expert');
    const [Employer, setEmployer] = useState('Worksafe NZ Limited');
    const [About, setAbout] = useState('I am a safety expert at worksafe limited. I am passionate about safety and spend my free time answering any questions you might have');
    const [Interests, setInterests] = useState('Violence, Poison');


    useEffect(()=>{

    });

    return (

        <><></><NavigationBar /><div className="profileimage">
            <img className="profilepic" src={profilepicture} alt="profilepic"></img>
            <h1 className="Author">{firstname} {lastname}</h1><br></br>
            <h2 classname="details">{Role} at {Employer}</h2><br></br>
            <p className="About">About me: <br></br>{About}</p><br></br>
            <p classname ="details">Interests: {Interests}</p>
            </div></>




    );

    


}
export default ProfileComponent;