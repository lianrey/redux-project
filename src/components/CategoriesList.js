import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class CategoriesList extends Component{

  render(){
    const { categories } = this.props
    return (
      <div>
      {
        categories && categories.map((category) => {
          return(
            <p>{category.name}</p>
          )
        })
      }
      </div>
    )
  }
}


function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

export default connect(mapStateToProps, { })(CategoriesList);
