import MyTag from './components-tom/MyTag/MyTag.js';
import MakeCommentComponent from "./MakeCommentCOmponent.jsx";
import MyTextBox from './components-tom/MyTextBox/MyTextBox.js';
import { useState } from 'react';
import NavigationBar from './navigationBar';
import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import ImageSelect from './components-tom/ImageSelect.js';
import axios from 'axios';

//npm i react-select!!!!!!!!!

 const options = [
    {value:"blue-violence", label : "violence"},
    {value:"TAG B", label : "TAG B"},
    {value:"TAG C", label : "TAG C"},
    {value:"TAG D", label : "TAG D"},
    {value:"TAG E", label : "TAG E"},
    {value:"TAG F", label : "TAG F"}
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

export default class  CreateStory extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onPost = this.onPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    this.state = {
      user: 'testuser',
      optionSelected: null,
      title:'',
      description: '',
      text:'',
      image: null
    };
  }

  handleChange (selected) { //used for dropdown menu selection
    // const NumberTags = this.state.tags.length;
    this.setState({
      optionSelected: selected //options selected keeps a list of all items
    });
  };

componentDidMount () {
  //fill in
}

onChangeTitle (e) {
  this.setState ({
    title: e.target.value
  })
}

onChangeDescription (e) {
  this.setState ({
    description: e.target.value
  })
}

onChangeText (e) {
  this.setState ({
    text: e.target.value
  })
}

onChangeImage (e) {
  // console.log(URL.createObjectURL(e.target.files[0]))
  this.setState ({
    image: e.target.files[0]
  })
}

onPost(e) {
  e.preventDefault();
  // const tagsSelected = []
  var tagsSelected="";
  this.state.optionSelected.forEach(element => {
    // tagsSelected.push(element.value);
    tagsSelected= tagsSelected+element.value+"-";
  });
  const post = {
    user: this.state.user,
    title: this.state.title,
    description: this.state.description,
    text: this.state.text,
    tags: tagsSelected,
    image: this.state.image
}

console.log(post);

  const formdata = new FormData();
  formdata.append('Author',this.state.user);
  formdata.append('Title', this.state.title);
  formdata.append('Description',this.state.description);
  formdata.append('Content',this.state.text);
  formdata.append('Date','22/01/2021');
   formdata.append('Image',this.state.image);
  formdata.append('Tags',tagsSelected);

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

  axios.post('http://localhost:3000/newcontent', formdata,config)
            .then((res) => {
                console.log(res.data)
                
                //if res code is 500, error. TODO: Write code to display to user
                //if res code is 200 , success.TODO: Write code to display to user
            }).catch((error) => {
                console.log(error)

            });


}

  render () {
    return(
      <div className="App">
        <NavigationBar />
        <form onSubmit={this.onPost}>

          <header id='createStoryHeader'>
            Create a new story
          </header>
          
          <div id='TitleInputDiv'>
            <label className='createStoryLabel'>
              Enter your story Title:
              <input type="text" placeholder='Add a Title'
              value={this.state.title}
              onChange={this.onChangeTitle}
              id='titleInput'
              />
            </label> 

          </div>
         
          
          <MyTextBox prompt="Enter a brief description of your story: " height="50px" inst="Story description..."
          value={this.state.description}
          onChange={this.onChangeDescription}/>
          <MyTextBox prompt="Enter story content here: " height="200px" inst="Story text..."
          value={this.state.text}
          onChange={this.onChangeText}/>
          
          <div id='TitleInputDiv'> 
            <label id='imageLabel'>
              Choose an image: 
              <ImageSelect 
              value={this.state.image}
              onChange={this.onChangeImage}
              selectedFile = {this.state.image}
              />
            </label>
          </div>
          
          
      
  {/*     

          <MyTag text="violence2" colour="green"/>
          <MyTag text="heights" colour="blue"/>
          <MyTag text="Air Toxins" colour="purple"/> */}
      

        <div id='multiSelectDiv'>

          <ReactSelect
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
          
        {/* </span> */}

          
      
          <br></br>
          <button type='submit' id='PostStoryButton'>Post Story</button>

        </form>
        

    </div>
    );
  }
  
}
// export default CreateStory;