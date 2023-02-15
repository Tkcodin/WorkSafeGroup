import './Comment2.css';
import Comment from './Comment2.js';

const CommentTree = (props) => {

    const comments = props.comments;

    console.log(comments);

    return(
        <div id="c2TreeV">
             {comments.map((comment, index) => (
               
                    <Comment tier={0} id={comment._id} comments={comment.Comments} key = {index} author = {comment.User} text = {comment.Text} />
            
            ))}
        </div>
    )
}

export default CommentTree