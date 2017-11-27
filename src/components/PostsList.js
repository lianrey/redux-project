import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { setSelection, fetchPostsWithRedux, deletePostRedux } from '../actions';
import CategoriesList from './CategoriesList';
import { withRouter } from 'react-router-dom';
import serializerForm from 'form-serialize';
import uuid from 'uuid';

class PostsList extends Component {
  componentDidMount() {
    let category = this.props.categoryParam;
    console.log(category)
    if(category){
      this.props.fetchPostsWithRedux(category, null);
    }
  }

  selectSort = (event, category) => {
    let sortType = (event)? event.target.value: "vote";
    //let category = (this.props.selection)?this.props.selection.category: selectedCategory;
    this.props.setSelection({category: category, sortType: sortType})
    this.props.fetchPostsWithRedux(category, sortType);
  }

  deletePost = (id) => {
    this.props.deletePostRedux(id);
  }

  render(){
    const { posts } = this.props
    return (
      <div>
        <CategoriesList showPosts={this.selectSort}>
        </CategoriesList>
        <Panel>
          <span>Order by: </span>
          <select onChange={this.selectSort}>
            <option value="vote">Vote Score</option>
            <option value="timestamp">Date</option>
          </select>
        </Panel>
        <div>
          {
            posts.map((post) => {
              return(
                <Panel key={post.id} header={post.title} bsStyle="primary">
                  <p>{post.body}</p>
                  <p>Comments ({post.commentCount})</p>
                  <p>Votes: {post.voteScore}</p>
                  <p>Category: {post.category}</p>
                  <ListGroup fill>
                    <ListGroupItem>{post.author} | {new Date(post.timestamp).toDateString()} {new Date(post.timestamp).toLocaleTimeString()}</ListGroupItem>
                    <ListGroupItem>
                      <Button bsStyle="primary">Edit</Button>
                      <Button bsStyle="danger" onClick={() => this.deletePost(post.id)}>Delete</Button>
                    </ListGroupItem>
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


function mapStateToProps({ posts, selection }) {
  return {
    posts: posts,
    selection: selection
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelection: (data) => dispatch(setSelection(data)),
    fetchPostsWithRedux: (byCategory, sortType) => dispatch(fetchPostsWithRedux(byCategory, sortType)),
    deletePostRedux: (id) => dispatch(deletePostRedux(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
