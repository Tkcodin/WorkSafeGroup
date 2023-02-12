import CommentTree from './Comment2Tree.js';
import Comment from './Comment2';
import './Comment2.css';

const CommentPractice = () => {

    const comments = [
        { author: "Stephen King", text: "I love killer clowns" },
        { author: "John Steinbeck", text: "Poor funny working man" },
        { author: "Jane Austen", text: "I'm writing funny books" },
        { author: "Mark Twain", text: "waht a river!" }
      ];
   

      return (
        
        <CommentTree comments={comments} />
        
      );
    }
  
    export default CommentPractice;