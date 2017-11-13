import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { getPosts, fetchPostsWithRedux } from '../actions';
import PostsList from './PostsList';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    categories: 'backend-data'
  }

  componentDidMount() {
    /*const url = `${process.env.REACT_APP_BACKEND}/posts`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' } } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({categories:data});
        console.log(data);
      });*/
      //this.props.getAllPosts();
    this.props.fetchPostsWithRedux();
  }

  render() {
    let categoriesArray = [{"name":"react","path":"react"},{"name":"redux","path":"redux"},{"name":"udacity","path":"udacity"}];
    const { categories } = this.state
    const { posts } = this.props
console.log(posts)
    return (
      <div className="App">
        <h1>Categories</h1>
        <Route exact path="/" render={({ history } ) => (
          <PostsList posts={posts}>
          </PostsList>
        )} />
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsWithRedux: () => dispatch(fetchPostsWithRedux())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
