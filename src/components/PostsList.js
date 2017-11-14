import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import CategoriesList from './CategoriesList';
import { Panel } from 'react-bootstrap';

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
            <Panel key={post.id} header={post.title} bsStyle="primary">
              <p>{post.body}</p>
              <p>{post.author}</p>
            </Panel>
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
