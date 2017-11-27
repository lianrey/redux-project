import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsWithRedux, fetchCategoriesWithRedux, setSelection } from '../actions';
import PostsList from './PostsList';
import AddPost from './AddPost';
import PostDetail from './PostDetail';
import { Route, Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class App extends Component {
  componentDidMount() {
    this.props.setSelection({category: null, sortType: "vote"})
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
          <Link to="/posts/new" className="navbar-brand"><Button>Add new post</Button></Link>
        </div>
      </header>
        <div className="container">
          <Route exact path="/" render={({ history } ) => {
            return <PostsList />
          }} />
          <Route exact path="/:category" render={({ match } ) => {
            const { category } = match.params;
            return <PostsList categoryParam = { category }/>
          }} />
          <Route exact path="/:category/:id" render={({ match }) => {
            const { id } = match.params;
            return <PostDetail postId={id} />
          }} />
          <Route exact path="/posts/new" component={AddPost} />
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
    setSelection: (data) => dispatch(setSelection(data)),
    fetchPostsWithRedux: (byCategory) => dispatch(fetchPostsWithRedux(byCategory)),
    fetchCategoriesWithRedux: () => dispatch(fetchCategoriesWithRedux())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
