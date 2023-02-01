import { useEffect, useState } from "react";
import React from "react";
import NavigationBar from "../navigationBar";
import './profileComponent.css';




const ProfileComponent =()=>{
    const  objectId  = useParams();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [Role, setRole] = useState('');
    const [Employer, setEmployer] = useState('');
    const [About, setAbout] = useState('');


    useEffect(()=>{

    });

    return (

        <><></><NavigationBar /><div className="ProfileContent">
            
            </div></>




    );

    


}
export default ProfileComponent;