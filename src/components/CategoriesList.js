import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { setSelection, fetchPostsWithRedux } from '../actions';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom'

class CategoriesList extends Component{
  selectCategory = (name) => {
    this.props.setSelection({category: name, sortType: this.props.selection.sort})
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
              <LinkContainer to={`/${category.name}`} key={category.name} >
                <NavItem>{category.name}
                </NavItem>
              </LinkContainer>
            )
          })
        }
      </Nav>
      </div>
    )
  }
}


function mapStateToProps({ categories, selection }) {
  return {
    categories: categories,
    selection: selection
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelection: (data) => dispatch(setSelection(data)),
    fetchPostsWithRedux: (byCategory) => dispatch(fetchPostsWithRedux(byCategory))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesList));
