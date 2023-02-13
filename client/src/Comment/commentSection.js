import CommentTree from './Comment2Tree.js';
import Comment from './Comment2';
import './Comment2.css';

const CommentSection = () => {

    const comments = [
        { author: "Stephen King", text: "I love killer clowns", tier: 0 },
        { author: "John Steinbeck", text: "Poor funny working man", tier: 0 },
        // { author: "Jane Austen", text: "I'm writing funny books", tier: 0 },
        // { author: "Mark Twain", text: "waht a river!", tier: 0, }
      ];

      return (
        <div id="commentTreeHolder">
            <CommentTree comments={comments} />
        </div>
      );
    }
  
    export default CommentSection;