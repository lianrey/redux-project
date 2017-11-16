import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchPostsWithRedux } from '../actions';

class PostsList extends Component{
  selectSort = (event) => {
    let sortType = event.target.value;
    let category = (this.props.selection)?this.props.selection.category: null;
    this.props.fetchPostsWithRedux(category, sortType);
  }

  render(){
    const { posts } = this.props
    return (
      <div>
        <Panel>
          <span>Order by: </span>
          <select onChange={this.selectSort}>
            <option value="vote">Vote Score</option>
            <option value="timestamp">Date</option>
          </select>
        </Panel>
        <div>
          {
            posts && posts.map((post) => {
              return(
                <Panel key={post.id} header={post.title} bsStyle="primary">
                  <p>{post.body}</p>
                  <p>Comments ({post.commentCount})</p>
                  <p>Votes: {post.voteScore}</p>
                  <ListGroup fill>
                    <ListGroupItem>{post.author} | {new Date(post.timestamp).toDateString()} {new Date(post.timestamp).toLocaleTimeString()}</ListGroupItem>
                  </ListGroup>
                </Panel>
              )
            })
          }
        </div>
      </div>
    )
  }
}


function mapStateToProps({ posts }) {
  return {
    posts: posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsWithRedux: (byCategory, sortType) => dispatch(fetchPostsWithRedux(byCategory, sortType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
