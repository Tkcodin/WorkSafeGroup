import React from 'react';
import user from './user.png';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props)
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onPost = this.onPost.bind(this);

        this.state = {
            username: '',
            comment: ''
        };   
    }

    componentDidMount () {
        this.setState({
            username: 'test user'
        })
    }

    onChangeUsername(e) {
        this.setState ({
            username: e.target.value
        })
    }

    onChangeComment(e) {
        this.setState ({
            comment: e.target.value
        })
    }

    onPost(e) {
        e.preventDefault();

        const post = {
            username: this.state.username,
            comment: this.state.comment
        }

        console.log(post);
        
        this.setState({
            comment: ''
        })
    }

    

    render () {
        return (
            <div id="commentBox">
                <form onSubmit={this.onPost}>
                    <img src={user} alt="Icon" id='userIcon' />
                    <input type="text" placeholder='Write a comment...' id='commentInput'
                    value={this.state.comment}
                    onChange={this.onChangeComment}
                    />
                    <button type='submit' id='postCommentButton'>Post</button>
                </form>
                
            </div>
        );
    }

}

