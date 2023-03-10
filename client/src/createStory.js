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

const categoryOptions = [
  {value:"Question", label:"Question"},
  {value:"Story", label:"Story"}
]

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

  const categoryOption = (props) => {
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

export default class  CreateStory extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onPost = this.onPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);

    this.state = {
      user: 'testuser',
      optionSelected: null,
      title:'',
      description: '',
      text:'',
      category: null,
      image: null,
      userID: localStorage.getItem('userID'),
      options: []
    };
  }

  handleChange (selected) { 
    this.setState({
      optionSelected: selected 
    });
  };

componentDidMount () {
  axios.get('http://localhost:3000/getTags')
      .then(response => {
        this.setState({
          options: response.data
        });
        console.log(this.state.options);

        })
      
      .catch(error => {console.log(error);})
  this.setState({
    user: localStorage.getItem('FirstName')
  });
}

onCategorySelect(selected) {
  this.setState({
    category: selected
  });
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
  
  this.setState ({
    image: e.target.files[0]
  })
}

onPost(e) {
  e.preventDefault();

  // const tagsSelected = []
  // var tagsSelected=t;
  const tagsSelected =[];

  this.state.optionSelected.forEach(element => {

    // tagsSelected.push(element.value);

    // tagsSelected= tagsSelected+element.value+", ";
    tagsSelected.push(element.value);

  });
  
  var categorySelected=this.state.category.value;

  const post = {
    userID: this.state.userID,
    user: this.state.user,
    title: this.state.title,
    description: this.state.description,
    text: this.state.text,
    category: categorySelected,
    tags: tagsSelected,
    image: this.state.image
}

console.log(post);

var date = new Date();


  const formdata = new FormData();
  formdata.append('UserID',this.state.userID);
  formdata.append('Author',this.state.user);
  formdata.append('Title', this.state.title);
  formdata.append('Description',this.state.description);
  formdata.append('Content',this.state.text);
  formdata.append('Date',date.toLocaleDateString('en-NZ') + ', ' + date.toLocaleTimeString('en-NZ', {hour: '2-digit', minute:'2-digit', hour12: true}));
  formdata.append('Category', this.state.category.value);
   formdata.append('Image',this.state.image);
  formdata.append('Tags',JSON.stringify(tagsSelected));

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

  axios.post('http://localhost:3000/newcontent', formdata,config)
            .then((res) => {
                console.log(res.data)
                if (res.status === 500) {
                  alert('Sorry, there was an erorr posting your story');
                } else if (res.status === 200) {
                  alert('Success! Your story has been posted.');
                  window.location = '/MainFeed';
                }
            }).catch((error) => {
                console.log(error)
                alert("The following error has occured: " + error);

            });


}

  render () {
    return(
      <div className="App">
        <NavigationBar />
        <div className='createStoryDiv'>
        <form onSubmit={this.onPost}>

          <header id='createStoryHeader'>
            Create a New Post
          </header>
          
          <div id='TitleInputDiv'>
              <input type="text" placeholder='Add a Title'
              value={this.state.title}
              onChange={this.onChangeTitle}
              id='titleInput'
              />
          </div>
         
         <div id='DescriptionInputDiv'>
              <textarea type="text" placeholder='Enter a brief description'
              value={this.state.description}
              onChange={this.onChangeDescription}
              id='descriptionInput'
              />
          </div>

          <div id='ContentInputDiv'>
              <textarea type="text" placeholder='Enter text for your post here'
              value={this.state.text}
              onChange={this.onChangeText}
              id='contentInput'
              />
          </div>
          
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
          
          {}
      
  {}
      
        <div id='singleSelectDiv'>

          <ReactSelect
            options={categoryOptions}
            isMulti={false}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            placeholder="Select Category"
            components={{
              categoryOption
            }}
            onChange={this.onCategorySelect}
            allowSelectAll={false}
            value={this.state.category}
          />
        </div>
          
        {}

        <div id='multiSelectDiv'>

          <ReactSelect
           options={this.state.options.map(option => ({ value: option._id, label: option.Name }))}
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
      
          <br></br>
          <button type='submit' id='PostStoryButton'>Submit Post</button>

        </form>
        
      </div>
    </div>
    );
  }
  
}
