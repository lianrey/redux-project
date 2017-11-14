import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { fetchPostsWithRedux, fetchCategoriesWithRedux } from '../actions';
import PostsList from './PostsList';
import { Route } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.fetchPostsWithRedux();
    this.props.fetchCategoriesWithRedux();
  }

  render() {
    return (
      <div className="App">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <h1>Categories</h1>
        <Route exact path="/" render={({ history } ) => (
          <PostsList>
          </PostsList>
        )} />
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => {
  return {
    posts: posts,
    categories: categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsWithRedux: () => dispatch(fetchPostsWithRedux()),
    fetchCategoriesWithRedux: () => dispatch(fetchCategoriesWithRedux())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
