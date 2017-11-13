import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class PostsList extends Component{

  render(){
    const { posts } = this.props;

    return (
      <div>
      {
        posts.lenght > 0
        && posts.posts.map((post) => {
          return(
            <p>{post.id}</p>
          )
        })
      }
      </div>
    )
  }
}


function mapStateToProps({ posts }) {
  return {
    posts: posts,
  }
}

export default connect(mapStateToProps, { })(PostsList);
