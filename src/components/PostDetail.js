import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import BtnDown from 'react-icons/lib/fa/thumbs-down'
import BtnUp from 'react-icons/lib/fa/thumbs-up'
import { Button, ButtonToolbar } from 'react-bootstrap';
import Modal from 'react-modal'
import AddComment from './AddComment';
import EditComment from './EditComment';
import { deletePostRedux, deleteCommentRedux, updateVotesRedux, updateCommentVotesRedux, editCommentRedux } from '../actions';

class PostDetail extends Component{
  state = {
    addCommentModalOpen: false,
    editCommentModalOpen: false
  }
  openCommentModal = () => {
    this.setState(() => ({
      addCommentModalOpen: true
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      addCommentModalOpen: false
    }))
  }

  openEditCommentModal = () => {
    this.setState(() => ({
      editCommentModalOpen: true
    }))
  }

  closeEditCommentModal = () => {
    this.setState(() => ({
      editCommentModalOpen: false
    }))
  }

  updatePostVotes = (id, type) => {
    this.props.updateVotesRedux(id, type);
  }

  updateCommentVotes = (comment, type) => {
    this.props.updateCommentVotesRedux(comment, type)
  }

  deletePost = (id) => {
    this.props.deletePostRedux(id);
    this.props.history.push('/');
  }

  deleteComment = (postId, commentId) => {
    this.props.deleteCommentRedux(postId, commentId);
  }

  addComment = (postId) => {
    this.openCommentModal();
  }

  editComment = (postId, comment) => {
    this.openEditCommentModal();
  }

  render(){
    const { addCommentModalOpen, editCommentModalOpen } = this.state;
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
                <Button onClick={() => {this.updatePostVotes(post.id, "downVote")}}>
                  <BtnDown size={30}/>
                </Button>
                <span> {post.voteScore} </span>
                <Button onClick={() => {this.updatePostVotes(post.id, "upVote")}}>
                  <BtnUp size={30}/>
                </Button>
              </ListGroupItem>
              <ListGroupItem>{post.author} | {post.timestamp}</ListGroupItem>
              <ListGroupItem>
                <b>Comments: ({post.commentCount})</b> <Button bsStyle="primary" onClick={() => this.addComment(post.id)}>Add Comment</Button><br/><br/>
                {
                  post.comments.map((c) => {
                    return(
                      <Panel key={c.id}>
                        <div>
                          <p>{c.body}</p>
                          <p>Author: {c.author}</p>
                          <Button onClick={() => {this.updateCommentVotes(c, "downVote")}}>
                            <BtnDown size={15}/>
                          </Button>
                          <span> {c.voteScore} </span>
                          <Button onClick={() => {this.updateCommentVotes(c, "upVote")}}>
                            <BtnUp size={15}/>
                          </Button>
                          <br /><br />
                          <Button bsStyle="primary" onClick={() => this.editComment(post.id, c)}>Edit</Button>
                          <Button bsStyle="danger" onClick={() => this.deleteComment(post.id, c.id)}>Delete</Button>
                        </div>
                        <Modal
                            isOpen={editCommentModalOpen}
                            onRequestClose={this.closeEditCommentModal}
                            contentLabel='Modal'
                          >
                          <div>
                            <EditComment comment={c} closeModal={this.closeEditCommentModal} />
                          </div>
                        </Modal>
                      </Panel>
                    )
                  })
                }
              </ListGroupItem>
              <ListGroupItem>
                <ButtonToolbar>
                  <Button bsStyle="danger" bsSize="large" onClick={() => this.deleteComment(post.id)}>Delete</Button>
                </ButtonToolbar>
              </ListGroupItem>
            </ListGroup>
            <Modal
                isOpen={addCommentModalOpen}
                onRequestClose={this.closeCommentModal}
                contentLabel='Modal'
              >
              <div>
                <AddComment category={post.category} postId={post.id} closeModal={this.closeCommentModal} />
              </div>
            </Modal>
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
    updateCommentVotesRedux: (comment, type) => dispatch(updateCommentVotesRedux(comment, type)),
    updateVotesRedux: (id, type) => dispatch(updateVotesRedux(id, type)),
    deleteCommentRedux: (postId, commentId) => dispatch(deleteCommentRedux(postId, commentId)),
    editCommentRedux: (comment) => dispatch(editCommentRedux(comment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
