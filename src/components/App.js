import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsWithRedux, fetchCategoriesWithRedux } from '../actions';
import PostsList from './PostsList';
import { Route } from 'react-router-dom';
import CategoriesList from './CategoriesList';

class App extends Component {
  componentDidMount() {
    this.props.fetchPostsWithRedux();
    this.props.fetchCategoriesWithRedux();
  }

  render() {
    return (
      <div className="App">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <div className="container">
          <h1>Readable</h1>
          <Route exact path="/" render={({ history } ) => (
            <div>
              <CategoriesList>
              </CategoriesList>
              <PostsList>
              </PostsList>
            </div>
          )} />
        </div>
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
    fetchPostsWithRedux: (byCategory) => dispatch(fetchPostsWithRedux(byCategory)),
    fetchCategoriesWithRedux: () => dispatch(fetchCategoriesWithRedux())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
