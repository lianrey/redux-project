import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import serializerForm from 'form-serialize'
import { editPostRedux } from '../actions';
import Modal from 'react-modal';

class EditPost extends Component{
  handleSubmit = (e) => {
			e.preventDefault()
			const values = serializerForm(e.target, {hash: true});
      const body = values.body;

      const data = this.props.post;
      data.body = body;
      this.props.editPostRedux(data);
      this.props.closeModal();
	}

  render(){
    const { post, openModal } = this.props;

    return (
      <Modal
          isOpen={openModal}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
        <Grid>
          <Row className="show-grid">
            <Col md={10}>
              <Panel header="Edit a post">
                <form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <label>Title: </label> {post.title}
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Body:</ControlLabel>
                    <FormControl componentClass="textarea" name="body" defaultValue={post.body} />
                  </FormGroup>

                  <Button type="submit">
                    Submit
                  </Button>
                </form>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Modal>
    )
  }
}


function mapStateToProps() {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editPostRedux: (post) => dispatch(editPostRedux(post))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));
