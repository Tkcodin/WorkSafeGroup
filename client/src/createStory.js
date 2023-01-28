import MyTag from './components-tom/MyTag/MyTag.js';
import MakeCommentComponent from "./MakeCommentCOmponent.jsx";
import MyTextBox from './components-tom/MyTextBox/MyTextBox.js';
import { useState } from 'react';
import NavigationBar from './navigationBar';
import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

//npm i react-select!!!!!!!!!

 const options = [
    {value:"TAG A", label : "TAG A"},
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

    this.state = {
      user: null,
      optionSelected: null,
      title:'',
      description: '',
      text:'',
      tags:[]
    };
  }

  handleChange (selected) { //used for dropdown menu selection
    const NumberTags = this.state.tags.length;
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

onPost(e) {
  e.preventDefault();
  const tagsSelected = []
  this.state.optionSelected.forEach(element => {
    tagsSelected.push(element.value);
  });

  const post = {
      user: this.state.user,
      title: this.state.title,
      description: this.state.description,
      text: this.state.text,
      tags: tagsSelected,
  }

  console.log(post);
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