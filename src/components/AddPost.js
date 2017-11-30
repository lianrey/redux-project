import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import serializerForm from 'form-serialize'
import { addPostRedux } from '../actions';
import uuid from 'uuid';

class AddPost extends Component{
  handleSubmit = (e) => {
			e.preventDefault()
			const values = serializerForm(e.target, {hash: true})
      const title = values.title;
      const author = values.author;
      const body = values.body;
      const category = values.category;
      const id = uuid();
      const timestamp = new Date().getTime();
      const voteScore = 0;
      const commentCount = [];

      const data = {
        id,
        title,
        author,
        body,
        category,
        timestamp,
        voteScore,
        commentCount
      }
      this.props.addPostRedux(data);
      this.props.history.push('/');
	}

  render(){
    const { categories } = this.props;

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={6}>
            <Panel header="Add a new post">
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <label>Title</label>
                  <FormControl type="text" name="title" />
                </FormGroup>
                <FormGroup>
                  <label>Author</label>
                  <FormControl type="text" name="author" />
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                 <ControlLabel>Select category</ControlLabel>
                 <FormControl componentClass="select" placeholder="select" name="category">
                 {
                   categories.map((category) => {
                     return(
                       <option key={category.name} value={category.name}>{category.name}</option>
                     )
                   })
                 }
                 </FormControl>
               </FormGroup>
               <FormGroup controlId="formControlsTextarea">
                 <ControlLabel>Post:</ControlLabel>
                 <FormControl componentClass="textarea" name="body"/>
               </FormGroup>

                <Button type="submit">
                  Submit
                </Button>
              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}


function mapStateToProps({ categories, selection }) {
  return {
    categories: categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPostRedux: (post) => dispatch(addPostRedux(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPost));
