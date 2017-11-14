import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Nav, NavItem } from 'react-bootstrap';

class CategoriesList extends Component{

  render(){
    const { categories } = this.props
    return (
      <div>
      <Nav bsStyle="pills">
        {
          categories && categories.map((category) => {
            return(
              <NavItem key={category.name}>{category.name}
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

export default connect(mapStateToProps, { })(CategoriesList);
