import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import serializerForm from 'form-serialize'
import { editCommentRedux } from '../actions';

class EditComment extends Component{
  handleSubmit = (e) => {
			e.preventDefault()
			const values = serializerForm(e.target, {hash: true});
      const body = values.body;

      const data = this.props.comment;
      data.body = body;
      this.props.editCommentRedux(data);
      this.props.closeModal();
	}

  render(){
    const { comment } = this.props;

    return (
      <Grid>
        <Row className="show-grid">
          <Col md={10}>
            <Panel header="Edit a comment">
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <label>Author: </label> {comment.author}
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Comment:</ControlLabel>
                  <FormControl componentClass="textarea" name="body" defaultValue={comment.body} required />
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
    editCommentRedux: (comment) => dispatch(editCommentRedux(comment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditComment));
