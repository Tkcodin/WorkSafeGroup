
import React from "react";
import { useEffect, useState } from "react";
import NavigationBar from "../navigationBar";
import './editProfileComponent.css';
import profilepicture from './profilepic.jpg';
import ImageSelect from '../components-tom/ImageSelect2';
import axios from 'axios';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

const EditProfileComponent =()=>{
 //Once we have set up the backend we will use the url params to pass the object id and then use effect hook to grab the user details from DB.
    //const  objectId  = useParams();
    //new image will be sent to the server to update the image on the server side
    const [Image,setImage] = useState('');
    //This is just to display image on the client side. profilepicture would be replaced by image retrieved from DB
    const[displayImage,setDisplayImage] = useState(profilepicture);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [Role, setRole] = useState('');
    const [Employer, setEmployer] = useState('');
    const [About, setAbout] = useState('');
    const [Interests, setInterests] = useState([]);
    const [emailPrivate, setEmailPrivate] = useState(false);
    const [rolePrivate, setRolePrivate] = useState(false);
    const [employerPrivate, setEmployerPrivate] = useState(false);
    const[options,setOptions] = useState([]);
    const[optionSelected,setOptionSelected] = useState();
  

    // const functiontofindindex=()=>{
     
    //   let count = 0;
    //   options.map(op=>{
    //     Interests.map(int=>{
    //       if(int.Name === op.Name){
    //         abc.push(count);
    //       }
    //     })
    //     count++;
    //   })
    // }

    const Option = (props) => {
      return (
        <div>
          <components.Option {...props}>
            <input
              type="checkbox"
              checked={props.isSelected}
              onChange={() => null} 
            />{" "}
            <label>{props.label}</label>
          </components.Option>
        </div>
      );
    };

   const handleChange= (selected)=> { 
    
       setOptionSelected(selected)

    };

    const handleImageChange = (event) =>{
  
            setImage(event.target.files[0]);
            console.log(event.target.files[0]);
            setDisplayImage(URL.createObjectURL(event.target.files[0]));
            console.log(Image);
            console.log(displayImage);     
          
    }
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        
      }

      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        
      }

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
        
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

      const onChangeEmailPrivate =() => {
        if (emailPrivate === false)
        {
          setEmailPrivate(true); 
        } else {
          setEmailPrivate(false); 
        }      
      }

      const onChangeRolePrivate = () => {
        if (rolePrivate === false)
        {
          setRolePrivate(true);  
        } else {
          setRolePrivate(false);  
        }      
      }

      const onChangeEmployerPrivate = ()=>{
        if (employerPrivate === false)
        {
          setEmployerPrivate(true);  
        } else {
          setEmployerPrivate(false);   
        }      
      }



       const onPost=(e)=>{

        e.preventDefault();

        const tagsSelected =[];

    optionSelected.forEach(element => {

    // tagsSelected.push(element.value);

    // tagsSelected= tagsSelected+element.value+", ";
    tagsSelected.push(element.value);

  });
          const user = {
            firstName: firstname,
            lastName: lastname,
            password: password,
            email: email,
            role: Role,
            employer:Employer,
            tags: tagsSelected,
            about: About,
            image: Image,
            emailPrivate: emailPrivate,
            rolePrivate: rolePrivate,
            employerPrivate: employerPrivate
          }
          localStorage.setItem("myTags", )
          console.log(user);
          console.log(Image);
          // localStorage.setItem('userEmail', this.state.email);
          // console.log(localStorage.getItem('userEmail'));

          const formdata = new FormData();
          formdata.append('FirstName',firstname);
          formdata.append('LastName', lastname);
          formdata.append('Password',password);
          formdata.append('Email',email);
          formdata.append('Role', Role);
          formdata.append('Employer',Employer);
          formdata.append('Tags',JSON.stringify(tagsSelected));
          formdata.append('About',About);
          formdata.append('Image',Image);
          formdata.append('EmailPrivate',emailPrivate);
          formdata.append('RolePrivate',rolePrivate);
          formdata.append('EmployerPrivate',employerPrivate);

          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }

          let userID = localStorage.getItem('userID');
          console.log(userID);

          axios.post('http://localhost:3000/edituser/' + userID, formdata,config)
              .then((res) => {
                console.log('Response status: ', res.status);
                console.log('Response data: ', res.data);
                  if (res.status === 500) {
                      alert('Sorry, there was an erorr updating your account');
                  } else if (res.status === 200) {
                      alert('Success! Your account has been updated.');
                      // window.location = '/MainFeed/'+this.state.email;
                      window.location = '/profileComponent/' + userID;
                      }
                      //if res code is 500, error. TODO: Write code to display to user
                      //if res code is 200 , success.TODO: Write code to display to user
                  }).catch((error) => {
                      console.log(error)
                      alert("The following error has occured: " + error);
                  });

                  // window.location = '/profileComponent/' + localStorage.getItem('userID');
                  // window.location = '/profileComponent/';

                  // alert('test');
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

          console.log(data.Image);
          
          setFirstName(data.FirstName);
          setLastName(data.LastName);
          setPassword(data.Password);
          setRole(data.Role);
          setEmail(data.Email);
          setEmployer(data.Employer);
          setAbout(data.About);
          // setInterests(data.Tags);
          setImage(data.Image);
          setDisplayImage(data.Image);
          setEmailPrivate(data.EmailPrivate);
          setRolePrivate(data.RolePrivate);
          setEmployerPrivate(data.EmployerPrivate);
          
          axios.get('http://localhost:3000/populatedTagsProfile/'+data._id)
          .then(response1 => {
          // setInterests(response1.data);
          // console.log(Interests);
          console.log(response1.data);
          // response1.forEach(element => {
          //   handleChange(element);
          // });
          const helper = [];
          for (let i = 0; i<response1.data.length;i++) {
            const obj = {value: response1.data[i]._id , label: response1.data[i].Name};
            helper.push(obj);
          }
          handleChange(helper);
          // const selected= Interests.map(int=>({value:int._id, label:int.Name}))  
          // setOptionSelected(selected);
          })
        

          })
         
      .catch(error => {console.log(error);})
      axios.get('http://localhost:3000/getTags')
      .then(response1 => {
      setOptions(response1.data);
      })
    
    .catch(error => {console.log(error);})


        }


      },[]);


    return(

      <div className="App1">
        <NavigationBar /> <form onSubmit={onPost}>

            <div className="editProfileContainer">

            <header id='editStoryHeader'>
            Edit Your Profile
            </header>

          {/* <img className="profilepic" id="pp" src={"http://localhost:3000/" + displayImage} alt="profilepic"></img>  */}

          <img className="profilepic" id="pp" src={displayImage} alt="profilepic"></img> 
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

       <div className="fieldContainer"> 
        <p className="changeAuthor">First name:<input type="text" value={firstname} onChange={handleFirstNameChange} /></p><br></br>
        </div>

        <div className="fieldContainer"> 
        <p className="changeAuthor">Last name:<input type="text" value={lastname} onChange={handleLastNameChange} /></p><br></br>
        </div>

        <div className="fieldContainer"> 
        <p className="changeAuthor">Password:<input type="text" value={password} onChange={handlePasswordChange} /></p><br></br>
        </div>
        
        <div className="fieldContainer"> 
        <label><b>Email Address:</b></label>
        <div  className='checkBoxContainer'>  
          <input type="text" placeholder="Enter Email Address"
          value={email}
          onChange={handleEmailChange}></input>
          <div className='checkBoxContainer2'>
            <p className='keepPrivate'> <b>Keep private?</b> </p>
            <input type="checkbox" className='checkbox'
            checked={ emailPrivate ? true : false }
            value={emailPrivate}
            onChange={onChangeEmailPrivate}/>
          </div>
        </div>
        </div>

        <div className="fieldContainer"> 
        <label><b>Role:</b></label>
        <div  className='checkBoxContainer'>  
          <input type="text" placeholder="Enter Email Address"
          value={Role}
          onChange={handleRoleChange}></input>
          <div className='checkBoxContainer2'>
            <p className='keepPrivate'> <b>Keep private?</b> </p>
            <input type="checkbox" className='checkbox'
            checked={ rolePrivate ? true : false }
            value={rolePrivate}
            onChange={onChangeRolePrivate}/>
          </div>
        </div>
        </div>

        <div className="fieldContainer"> 
        <label><b>Employer:</b></label>
        <div  className='checkBoxContainer'>  
          <input type="text" placeholder="Enter Email Address"
          value={Employer}
          onChange={handleEmployerChange}></input>
          <div className='checkBoxContainer2'>
            <p className='keepPrivate'> <b>Keep private?</b> </p>
            <input type="checkbox" className='checkbox'
            checked={ employerPrivate ? true : false }
            value={employerPrivate}
            onChange={onChangeEmployerPrivate}/>
          </div>
        </div>
        </div>

        <div className="fieldContainer"> 
        <p className="About">About me: <br></br><textarea className="aboutInput" rows="10" cols="30" value={About} onChange={handleAboutChange} /></p><br></br>
        <p classname ="details">Interests/Tags:</p>
        <ReactSelect
           options={options.map(option => ({ value: option._id, label: option.Name }))}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            // defaultValue = {}
            placeholder="Select Story Tags"
            components={{
              Option
            }}
          
            onChange={handleChange}

            allowSelectAll={true}
            value={optionSelected}
            />
            </div>
        <button type='submit' id='PostStoryButton'>submit</button>
        </div></form>
        </div>
    );
}

export default EditProfileComponent;