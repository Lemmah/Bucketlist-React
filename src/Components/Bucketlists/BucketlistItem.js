import React, { Component } from 'react'
import { Button, ButtonToolbar, Row, Col } from 'react-bootstrap'
import ActionForm from './../Commons/ActionForm'

const buttonsInstance = (
  <ButtonToolbar>
    <Button>A</Button>
    <Button bsStyle='primary'>B</Button>
    <Button bsStyle='success'>C</Button>
    <Button bsStyle='info'>D</Button>
    <Button bsStyle='warning'>E</Button>
    <Button bsStyle='danger'>F</Button>
  </ButtonToolbar>
)

class BucketlistItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      formShow: false,
    }

    this.formClose = this.formClose.bind(this);
    this.formOpen = this.formOpen.bind(this);
    this.createBucketlistItem = this.createBucketlistItem.bind(this);
  }

  formClose(){
    this.setState({
      formShow: false,
    })
  }

  formOpen(){
    this.setState({
      formShow: true,
    })
  }

  createBucketlistItem(){
    console.log("Create Bucketlist Item")
  }

  displayBucketlistItem () {
    if (!this.props.bucketlistName || !this.props.items) {
      return (
        <ul className='list-group'>
          <h3>
            <center>
                Welcome! Before you die...?
              </center>
          </h3>
          <li className='list-group-item' />
          <li className='list-group-item'>
            You currently don't have any bucketlists! Maybe you should
            start by creating one then you items in it will appear here.
          </li>
          <li className='list-group-item' />
        </ul>
      )
    } else {
      if (!this.props.items.length > 0) {
        return (
          <table className="table">
            <thead>
              <tr>
                <th><h3>{this.props.bucketlistName.name}</h3></th>
                <th>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={this.formOpen}
                  >
                  Add Activity
                  </button>{' '}
                  <button
                    className="btn btn-info btn-sm"
                  >
                  Edit Details
                  </button>{' '}
                  <button
                    className="btn btn-danger btn-sm"
                  >
                  Delete
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ cursor: "pointer" }}>
                <td>This Bucketlist is empty.</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )
      } else {
        return (
          <ul className='list-group'>
            <Row>
              <Col xs={6} md={6}>
                <h3>
                  <center>
                    {this.props.bucketlistName}
                  </center>
                </h3>
              </Col>
              <Col xs={6} md={6}>
                {buttonsInstance}
              </Col>
            </Row>
            {this.props.items.map((bucketlistItem) => {
              return (
                <li
                  key={bucketlistItem.id}
                  className='list-group-item bucketlistItem'
                >
                  <Row>
                    <Col md={6} sm={6}>
                      {bucketlistItem.name}
                    </Col>
                    <Col md={6} sm={6} style={{textAlignment: 'right'}}>{' '}
                      <Button bsStyle='success'>A</Button>{' '}
                      <Button bsStyle='warning'>E</Button>{' '}
                      <Button bsStyle='danger'>D</Button>{' '}
                    </Col>
                  </Row>
                </li>)
            })}
          </ul>
        )
      }
    }
  }

  render () {
    return (
      <div>
        {this.displayBucketlistItem()}
        <ActionForm
          action='Add Activity' 
          show={this.state.formShow} 
          onHide={this.formClose}
          onCreateResource={this.createBucketlistItem}
        />
      </div>
    )
  }
}

export default BucketlistItem
