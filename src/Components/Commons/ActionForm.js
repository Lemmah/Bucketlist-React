import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


class ActionForm extends Component {

  createResource = (e) => {
    let resourceName = this.refs.resourceName.value;
    this.props.onCreateResource(resourceName);
    e.preventDefault();
  }

  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize='small' aria-labelledby='contained-modal-title-lg'>
        <Form horizontal onSubmit={this.createResource.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-lg'>{this.props.action}</Modal.Title>
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
             {this.props.action.split(' ')[0]}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default ActionForm
