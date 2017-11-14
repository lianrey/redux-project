import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import CategoriesList from './CategoriesList';

class PostsList extends Component{

  render(){
    const { posts } = this.props
    return (
      <div>
      <CategoriesList>
      </CategoriesList>
      {
        posts && posts.map((post) => {
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
    posts: posts
  }
}

export default connect(mapStateToProps, { })(PostsList);
