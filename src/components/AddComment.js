import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import serializerForm from 'form-serialize'
import { addCommentRedux } from '../actions';
import uuid from 'uuid';

class AddComment extends Component{
  handleSubmit = (e) => {
			e.preventDefault()
			const values = serializerForm(e.target, {hash: true});
      const author = values.author;
      const body = values.body;
      const id = uuid();
      const timestamp = new Date().getTime();
      const voteScore = 0;
      const parentId = this.props.postId;

      const data = {
        id,
        author,
        body,
        timestamp,
        voteScore,
        parentId
      }
      this.props.addCommentRedux(data);
      this.props.closeModal();
	}

  render(){
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={10}>
            <Panel header="Add a new comment">
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <label>Author</label>
                  <FormControl type="text" name="author" />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Comment:</ControlLabel>
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


function mapStateToProps() {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCommentRedux: (comment) => dispatch(addCommentRedux(comment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddComment));
