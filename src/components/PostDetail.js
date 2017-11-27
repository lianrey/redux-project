import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class PostDetail extends Component{
  render(){
    const { posts, postId } = this.props;
    const selectedPost = posts ? posts.filter(p => { return p.id === postId }) : [];

    return(
      <div>
      { selectedPost.map((post) => (
          <Panel key={post.id} header={post.title} bsStyle="primary">
            <p>{post.body}</p>
            <p>Comments ({post.commentCount})</p>
            <p>Votes: {post.voteScore}</p>
            <p>Category: {post.category}</p>
            <ListGroup fill>
              <ListGroupItem>{post.author} | {post.timestamp}</ListGroupItem>
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
