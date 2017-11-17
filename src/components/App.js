import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsWithRedux, fetchCategoriesWithRedux } from '../actions';
import PostsList from './PostsList';
import { Route, Link, withRouter } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.fetchPostsWithRedux();
    this.props.fetchCategoriesWithRedux();
  }

  render() {
    return (
      <div className="App">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
      <header className="bs-docs-nav navbar navbar-default navbar-static-top">
        <div className="container">
          <Link to="/" className="navbar-brand">Redux project</Link>
        </div>
      </header>
        <div className="container">
          <Route exact path="/" render={({ history } ) => {
            return <PostsList />
          }} />
          <Route path="/:category" render={({ match } ) => {
            const { category } = match.params;
            return <PostsList categoryParam = { category }/>
          }} />
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
