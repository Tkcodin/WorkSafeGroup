import React, { useState,useEffect } from 'react';
import './logIn.css';
// import './signUp.css';
import SignUp from './signUp';
import NavigationBar from './navigationBar';
import axios from 'axios';

const LogIn = (props) => {

    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');
    const [infoText, setInfoText] = useState('Log In Or Press Sign Up');


    useEffect(()=>{
        
    });

    function closeSignUpNoButton(){
        props.modal.style.display = "none";
    }

    function closeSignUp (e) {
        e.preventDefault();
        props.modal.style.display = "none";
    }

    const changeUN = (e) => {
        setUserName(e.target.value);
    }

    const changePw1 = (e) => {
        setPassword1(e.target.value);
    }
    
    const changeIT = (s)  =>{
        setInfoText(s);
    }
    

    function doLogIn(e){

        e.preventDefault();

        localStorage.setItem('userEmail', userName);
        let userEmail = localStorage.getItem('userEmail');
          
          if(userEmail != 'Email' && userEmail != null) {
            axios.get('http://localhost:3000/getuser/'+userEmail)
        
            .then(response => {
            
            if (response.data === null) {
                changeIT("Sorry, that password and email combination does not exist.");
            } else {
            const data = response.data;
            console.log(data);
            console.log(data._id);

          

            console.log("doing log in");
            // e.preventDefault();
            if(password1 != '' && userName != '' && password1===data.Password){
                //check database here
                const confirmLI = localStorage.getItem("loggedIn");
                console.log(confirmLI);
                localStorage.setItem('loggedIn', 'y');

                localStorage.setItem('userEmail', userName);
                localStorage.setItem('userID',data._id); //gets the id of current user and sets to local storage variable
                localStorage.setItem('FirstName',data.FirstName);

                const confirmLI2 = localStorage.getItem("loggedIn");
                console.log(confirmLI2);
                console.log("Logged in");
                closeSignUpNoButton();
                window.location = "/Mainfeed";
            } else if (password1 != data.Password) {
                changeIT("Sorry, that username and password combination does not exist");
                console.log("Sorry, that username and password combination doesn't exist");
                localStorage.clear();
            }
            else if(password1 != '' && userName != ''){
                //communicate this to user
                changeIT("Passwords must match!");
                console.log("Passwords must match!");
                localStorage.clear();
            }
            else{
                //communicate this to user
                changeIT("You must complete each field!");
                console.log("need UN, PW1 & PW2");
                localStorage.clear();
            }

            }})
          }
         
    }

    function goSignUp(e){
        console.log("doing log in");
        e.preventDefault();
        
        closeSignUpNoButton();
        var modal = document.getElementById('createAccModal');

        modal.style.display = 'block';
  
        //redirect to sign up page here
    }
    return (

        <div id="logInModal" class="modal">
                <form class="modal-content animate">
                    <div class = 'container'>
                        <h1>{infoText}</h1>
                        <br></br>
                        
                        <label><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" 
                        value={userName}
                        onChange={changeUN}
                        ></input>

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password"
                        value={password1}
                        onChange={changePw1}
                        ></input>
                        
                        <button type="submit" id='login'
                        onClick = {doLogIn}
                        >Log In</button>

                        <button id='orSignUp'
                        onClick = {goSignUp}
                        >Or - Sign Up</button>
                    </div>

                    <div class="container" id='cancelContainer'>
                        <button type="button" class="cancelbtn" id='cancelLogin'
                        onClick = {closeSignUp}
                        >Cancel</button>
                    </div>
                </form>     
            </div>

    )
}

export default LogIn;