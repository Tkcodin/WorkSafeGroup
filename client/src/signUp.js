import React, { Component } from 'react'
import './signUp.css';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import ImageSelect from './components-tom/ImageSelect.js';
import axios from 'axios';



const options = [
    {value:"blue-violence", label : "violence"},
    {value:"red-heights", label : "heights"},
    {value:"green-agriculture", label : "agriculture"},
    {value:"yellow-sickness", label : "sickness"},
    {value:"purple-poison", label : "poison"},
    {value:"silver-dragons", label : "dragons"}
  ];

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null} //below braces needed?
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.closeSignUp=this.closeSignUp.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeEmployer = this.onChangeEmployer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeAbout = this.onChangeAbout.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onPost = this.onPost.bind(this);
        
        this.state = {
            firstName: '',
            lastName: '',
            password:'',
            email:'',
            role:'',
            employer:'',
            optionSelected: null,
            about:'',
            image: null
        };  
    }

    componentDidMount () {
        this.setState({
            // username: 'test user'
        })
    }

    handleChange (selected) { //used for dropdown menu selection
        // const NumberTags = this.state.tags.length;
        this.setState({
          optionSelected: selected //options selected keeps a list of all items
        });
      };

      onChangeFirstName (e) {
        this.setState ({
          firstName: e.target.value
        })
      }

      onChangeLastName (e) {
        this.setState ({
          lastName: e.target.value
        })
      }

      onChangePassword (e) {
        this.setState ({
          password: e.target.value
        })
      }

      onChangeEmail (e) {
        this.setState ({
          email: e.target.value
        })
      }

      onChangeRole (e) {
        this.setState ({
          role: e.target.value
        })
      }

      onChangeEmployer (e) {
        this.setState ({
          employer: e.target.value
        })
      }

      onChangeAbout (e) {
        this.setState ({
          about: e.target.value
        })
      }

      onChangeImage (e) {
        // console.log(URL.createObjectURL(e.target.files[0]))
        this.setState ({
          image: e.target.files[0]
        })
      }

    closeSignUp () {
        this.props.modal.style.display = 'none';
      }

    onPost(e) {
        e.preventDefault();

        var tagsSelected="";
        this.state.optionSelected.forEach(element => {
            // tagsSelected.push(element.value);
            tagsSelected= tagsSelected+element.value+"-";
        });

        const post = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            role: this.state.role,
            employer:this.state.employer,
            tags: tagsSelected,
            about: this.state.about,
            image: this.state.image
        }

        console.log(post);

        // const formdata = new FormData();
        // formdata.append('First Name',this.state.firstName);
        // formdata.append('Last Name', this.state.lastName);
        // formdata.append('Password',this.state.password);
        // formdata.append('Email',this.state.email);
        // formdata.append('Role',this.state.role);
        // formdata.append('Employer',this.state.employer);
        // formdata.append('Tags',tagsSelected);
        // formdata.append('About',this.state.about);
        // formdata.append('Image',this.state.image);

        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }

        // axios.post('http://localhost:3000/newuser', formdata,config)
        //     .then((res) => {
        //         console.log(res.data)
        //         if (res.status === 500) {
        //             alert('Sorry, there was an erorr creating your account');
        //         } else if (res.status === 200) {
        //             alert('Success! Your account has been created.');
        //             window.location = '/MainFeed';
        //             }
        //             //if res code is 500, error. TODO: Write code to display to user
        //             //if res code is 200 , success.TODO: Write code to display to user
        //         }).catch((error) => {
        //             console.log(error)
        //             alert("The following error has occured: " + error);
        //         });
    }

    render () {
        return (
            <div id="createAccModal" class="modal">
                <form class="modal-content animate">
                    <div class = 'container'>
                        <h1>Create an account</h1>
                        <br></br>
                        <label><b>First Name</b></label>
                        <input type="text" placeholder="Enter First name" 
                        value={this.state.firstName}
                        onChange={this.onChangeFirstName}
                        ></input>

                        <label><b>Last Name</b></label>
                        <input type="text" placeholder="Enter Last Name"
                        value={this.state.lastName}
                        onChange={this.onChangeLastName}
                        ></input>

                        <label><b>Email Address</b></label>
                        <input type="text" placeholder="Enter Email Address"
                        value={this.state.email}
                        onChange={this.onChangeEmail}></input>
                        
                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}></input>

                        <label><b>Role</b></label>
                        <input type="text" placeholder="Enter your current role"
                        value={this.state.role}
                        onChange={this.onChangeRole}></input>

                        <label><b>Employer</b></label>
                        <input type="text" placeholder="Enter Employer"
                        value={this.state.employer}
                        onChange={this.onChangeEmployer}></input>

                        <label><b>Interests/Tags</b></label>
                        <div id='multiSelectDiv2'>

                            <ReactSelect id='createDropDown'
                                options={options}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                placeholder="Select Story Tags"
                                components={{
                                Option
                                }}
                                onChange={this.handleChange}
                                allowSelectAll={true}
                                value={this.state.optionSelected}
                            />
                        </div>

                        <label><b>About You</b></label>
                        <input type="text" placeholder="Write a description about you"
                        value={this.state.about}
                        onChange={this.onChangeAbout}></input>
                        
                        <label id='createImageSelectLabel'><b>Profile Image Selection</b></label>
                        <ImageSelect
                         value={this.state.image}
                         onChange={this.onChangeImage}
                         selectedFile = {this.state.image}
                         />

                        <button type="submit" id='createAccountButton2'
                        onClick = {this.onPost}
                        >Create Account</button>
                    </div>

                    <div class="container" id='cancelContainer'>
                        <button type="button" class="cancelbtn" id='cancelCreate'
                        onClick = {this.closeSignUp}
                        >Cancel</button>
                    </div>
                </form>     
            </div>
        );
    }

}