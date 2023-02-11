import './Comment2.css';
import Comment from './Comment2.js';

const CommentTree = (props) => {

    const comments = props.comments;

    return(
        <div id="c2TreeV">
             {comments.map((comment, index) => (
               
                    <Comment tier={0} comments={comments} key = {index} author = {comment.author} text = {comment.text} />
            
            ))}
        </div>
    )
}

export default CommentTree