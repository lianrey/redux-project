import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, Button, ControlLabel, ListGroup, ListGroupItem } from 'react-bootstrap';
import serializerForm from 'form-serialize'
import { addPostRedux } from '../actions';
import uuid from 'uuid';

class PostDetail extends Component{
  render(){
    const { posts, postId } = this.props;
    const selectedPost = posts ? posts.filter(p => { return p.id === postId }) : '';

    return (
      <Panel key={selectedPost.id} header={selectedPost.title} bsStyle="primary">
        <p>{selectedPost.body}</p>
        <p>Comments ({selectedPost.commentCount})</p>
        <p>Votes: {selectedPost.voteScore}</p>
        <p>Category: {selectedPost.category}</p>
        <ListGroup fill>
          <ListGroupItem>{selectedPost.author} | {new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()}</ListGroupItem>
        </ListGroup>
      </Panel>
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
