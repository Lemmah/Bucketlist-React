import React, { Component } from 'react'
import ActionForm from './../Commons/ActionForm'


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

  createBucketlistItem(name){
    const resourceUrl = "/bucketlists/"+this.props.bucketlist.id+"/items"
    let details = {
      "name": name,
    }
    this.props.createBucketlistItem(resourceUrl, details)
    this.setState({
      formShow: false,
    })
  }

  displayBucketlistItem () {
    if (!this.props.bucketlist) {
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
            start by creating one then activities you add to it will appear here.
          </li>
          <li className='list-group-item' />
        </ul>
      )
    } else {
      if (!this.props.items) {
        return (
          <table className="table">
            <thead>
              <tr>
                <th><h3>{this.props.bucketlist.name} Activities</h3></th>
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
          <table className="table">
            <thead>
              <tr>
                <th><h3>{this.props.bucketlist.name} Activities</h3></th>
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
                {this.props.items.map((bucketlistItem) => {
                        return (
                          <tr style={{ cursor: "pointer" }}>
                          <td
                            key={bucketlistItem.id}
                            className='bucketlistItem'
                          >
                          {bucketlistItem.name}
                          </td>
                          <td>
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
                          </td>
                          </tr>)
                      })}    
            </tbody>
          </table>  
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
