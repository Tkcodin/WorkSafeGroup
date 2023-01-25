import React,{Component} from 'react';


// This is a component to read a comment


class ReadComment extends Component{
 
    //Code to handle the reply function
    handleReply = () => {
        // should put the create comment component here
      }
    
      handleLike = () => {
       
      }
      //code to handle the like button
    render(){
        
        return (
            <div style={{border: '1px solid gray', paddingTop: '10px',paddingBottom:'10px',paddingLeft:'10px',paddingRight:'10px', 
            margin: '10px',width:'20vw'}}>
              <h3>{this.props.name}</h3>
              <h4>{this.props.jobTitle}</h4>
              <p>{this.props.comment}</p>
              <p>{this.props.date}</p>
              <button onClick={this.handleReply}>Reply</button>
              <button onClick={this.handleLike}>Like </button>
            </div>
          );
    }
}

export default ReadComment;