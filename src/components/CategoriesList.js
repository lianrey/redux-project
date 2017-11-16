import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Nav, NavItem } from 'react-bootstrap';
import { setSelection, fetchPostsWithRedux } from '../actions';

class CategoriesList extends Component{
  selectCategory = (name) => {
    this.props.setSelection({category: name})
    this.props.fetchPostsWithRedux(name);
  }

  render(){
    const { categories } = this.props
    return (
      <div>
      <Nav bsStyle="pills">
        {
          categories && categories.map((category) => {
            return(
              <NavItem key={category.name} onClick={ () => this.selectCategory(category.name) }>{category.name}
              </NavItem>
            )
          })
        }
      </Nav>
      </div>
    )
  }
}


function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelection: (category) => dispatch(setSelection(category)),
    fetchPostsWithRedux: (byCategory) => dispatch(fetchPostsWithRedux(byCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
