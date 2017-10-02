import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


class ActionForm extends Component {

  doAction = (e) => {
    let resourceName = this.refs.resourceName.value;
    let action = this.props.action.toLowerCase(),
        create = "create", add = "add";
    (action.includes(create) || action.includes(add) ?
      this.props.onCreateResource(resourceName)
      :
      this.props.onUpdateResource(resourceName)
    )
    e.preventDefault();
  }

  render () {
    return (
      <Modal 
        show={this.props.show}
        onHide={this.props.onHide}
        bsSize='small'
        aria-labelledby='contained-modal-title-lg'
      >
        <Form horizontal
          onSubmit={this.doAction.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-lg'>
              {this.props.action}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <label>Name:</label>
              <input
                defaultValue={this.props.value}
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
