import React, { Component } from 'react'
import { Modal, Button, Form, FormGroup,
        ControlLabel } from 'react-bootstrap'


class CreateForm extends Component {

  createResource = (e) => {
    let resourceName = this.refs.resourceName.value;
    this.props.onCreateResource(resourceName);
    console.log(">>",this.props.onCreateResource(resourceName))
    e.preventDefault();
  }

  render () {
    return (
      <Modal {...this.props} bsSize='small' aria-labelledby='contained-modal-title-lg'>
        <Form horizontal onSubmit={this.createResource}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-lg'>Create Something</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <label>Name:</label>
              <input 
                type="text" 
                className="form-control" 
                ref="resourceName"
              />
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="danger"
              onClick={this.props.onHide}
            >
              Cancel
            </Button>
            <Button 
              bsStyle="success"
              type="submit"
            >
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default CreateForm
