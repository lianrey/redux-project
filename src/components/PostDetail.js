import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { updateVotesRedux, deletePostRedux, deleteCommentRedux } from '../actions';
import BtnDown from 'react-icons/lib/fa/thumbs-down'
import BtnUp from 'react-icons/lib/fa/thumbs-up'
import { Button, ButtonToolbar } from 'react-bootstrap';

class PostDetail extends Component{
  updateVotes = (id, type) => {
    this.props.updateVotesRedux(id, type);
  }

  deletePost = (id) => {
    this.props.deletePostRedux(id);
    this.props.history.push('/');
  }

  deleteComment = (postId, commentId) => {
    this.props.deleteCommentRedux(postId, commentId);
  }

  render(){
    const { posts, postId } = this.props;
    const selectedPost = posts ? posts.filter(p => { return p.id === postId }) : [];

    return(
      <div>
      { selectedPost.map((post) => (
          <Panel key={post.id} header={post.title} bsStyle="primary">
            <p>{post.body}</p>
            <p>Votes: {post.voteScore}</p>
            <p>Category: {post.category}</p>
            <ListGroup fill>
              <ListGroupItem>
                <Button onClick={() => {this.updateVotes(post.id, "downVote")}}>
                  <BtnDown size={30}/>
                </Button>
                <span> {post.voteScore} </span>
                <Button onClick={() => {this.updateVotes(post.id, "upVote")}}>
                  <BtnUp size={30}/>
                </Button>
              </ListGroupItem>
              <ListGroupItem>{post.author} | {post.timestamp}</ListGroupItem>
              <ListGroupItem>
                <b>Comments: ({post.commentCount})</b><br/>
                {
                  post.comments.map((c) => {
                    return(
                      <Panel key={c.id}>
                        <div>
                          <p>{c.body}</p>
                          <p>Author: {c.author}</p>
                          <Button onClick={() => {this.updateVotes(post.id, "downVote")}}>
                            <BtnDown size={15}/>
                          </Button>
                          <span> {c.voteScore} </span>
                          <Button onClick={() => {this.updateVotes(post.id, "upVote")}}>
                            <BtnUp size={15}/>
                          </Button>
                          <br /><br />
                          <Button bsStyle="danger" onClick={() => this.deleteComment(post.id, c.id)}>Delete</Button>
                        </div>
                      </Panel>
                    )
                  })
                }
              </ListGroupItem>
              <ListGroupItem>
                <ButtonToolbar>
                  <Button bsStyle="primary" bsSize="large">Edit</Button>
                  <Button bsStyle="danger" bsSize="large" onClick={() => this.deleteComment(post.id)}>Delete</Button>
                </ButtonToolbar>
              </ListGroupItem>
            </ListGroup>
          </Panel>
        ))
      }
      </div>
    )
  }
}


function mapStateToProps({posts}) {
  return {
    posts: posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePostRedux: (id) => dispatch(deletePostRedux(id)),
    updateVotesRedux: (id, type) => dispatch(updateVotesRedux(id, type)),
    deleteCommentRedux: (postId, commentId) => dispatch(deleteCommentRedux(postId, commentId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
