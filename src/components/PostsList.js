import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, ListGroup, ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import { setSelection, fetchPostsWithRedux, deletePostRedux, updateVotesRedux } from '../actions';
import CategoriesList from './CategoriesList';
import { withRouter } from 'react-router-dom';
import BtnDown from 'react-icons/lib/fa/thumbs-down'
import BtnUp from 'react-icons/lib/fa/thumbs-up'

class PostsList extends Component {
  componentDidMount() {
    let category = this.props.categoryParam;
    if(category){
      this.props.fetchPostsWithRedux(category, null);
    }
  }

  selectSort = (event, category) => {
    let sortType = (event)? event.target.value: "voteScore";
    //let category = (this.props.selection)?this.props.selection.category: selectedCategory;
    this.props.setSelection({category: category, sortType: sortType});
    this.props.fetchPostsWithRedux(category, sortType);
  }

  deletePost = (id) => {
    this.props.deletePostRedux(id);
  }

  updateVotes = (id, type) => {
    this.props.updateVotesRedux(id, type);
  }

  viewDetailPost = (id, category) => {
    this.props.history.push(`/${category}/${id}`);
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
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Date</option>
          </select>
        </Panel>
        <div>
          {
            posts.map((post) => {
              return(
                <Panel key={post.id} header={post.title} bsStyle="primary" onClick={() => this.viewDetailPost(post.id, post.category)}>
                  <p>{post.body}</p>
                  <p>Comments ({post.commentCount})</p>
                  <p>Votes: {post.voteScore}</p>
                  <p>Category: {post.category}</p>
                  <ListGroup fill>
                    <ListGroupItem>Author: {post.author} | {new Date(post.timestamp).toDateString()} {new Date(post.timestamp).toLocaleTimeString()}</ListGroupItem>
                    <ListGroupItem>
                      <Button onClick={() => {this.updateVotes(post.id, "downVote")}}>
                        <BtnDown size={30}/>
                      </Button>
                      <span> {post.voteScore} </span>
                      <Button onClick={() => {this.updateVotes(post.id, "upVote")}}>
                        <BtnUp size={30}/>
                      </Button>
                    </ListGroupItem>
                    <ListGroupItem>
                      <ButtonToolbar>
                        <Button bsStyle="primary">Edit</Button>
                        <Button bsStyle="danger" onClick={() => this.deletePost(post.id)}>Delete</Button>
                      </ButtonToolbar>
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
    deletePostRedux: (id) => dispatch(deletePostRedux(id)),
    updateVotesRedux: (id, type) => dispatch(updateVotesRedux(id, type))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
