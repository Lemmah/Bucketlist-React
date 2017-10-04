import React, { Component } from 'react';
import uuid from 'uuid';

class DataTable extends Component {
  formOpen(action) {
    this.props.formOpen(action);
  }

  deleteBucketlist() {
    this.props.deleteBucketlist();
  }

  deleteItem(id) {
    this.props.deleteItem(id);
  }

  editBucketlist() {
    this.props.editBucketlist();
  }

  editItem(id) {
    this.props.editItem(id);
  }

  tableHeader() {
    if (!this.props.bucketlist) {
      return (
        <tr>
          <th>
            <h3> Welcome, before you die? </h3>
          </th>
          <th>Create Some Bucketlists</th>
        </tr>
      );
    }
    return (
      <tr>
        <th><h3>{this.props.bucketlist.name} Activities</h3></th>
        <th>
          <button
            className="btn btn-success btn-sm"
            onClick={this.formOpen.bind(this, 'Add Activities')}
          >
            Add Activity
          </button>{' '}
          <button
            className="btn btn-info btn-sm"
            onClick={this.editBucketlist.bind(this)}
          >
            Edit Details
          </button>{' '}
          <button
            className="btn btn-danger btn-sm"
            onClick={this.deleteBucketlist.bind(this)}
          >
            Delete
          </button>
        </th>
      </tr>
    );
  }

  tableBody() {
    if (!this.props.items) {
      return (
        <tbody>
          <tr style={{ cursor: 'pointer' }}>
            {(this.props.bucketlist ?
              <td>
		          	This Bucketlist is empty.
		          </td>
		          :
              <td>
		          	Yo! Start making your life meaningful!
		          </td>
		          )}
            <td />
          </tr>
          <tr>
            <td><br /></td>
            <td><br /></td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {this.props.items.map((bucketlistItem) => {
          if (!bucketlistItem) {
            return null;
          }
          return (
            <tr
              style={{ cursor: 'pointer' }}
              key={uuid.v4()}
            >
              <td
                className="bucketlistItem"
              >
                {bucketlistItem.name}
              </td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={this.editItem.bind(this, bucketlistItem)}
                >Edit Details
                </button>{' '}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={this.deleteItem.bind(this, bucketlistItem.id)}
                >Delete
                </button>
              </td>
            </tr>);
        })}
        <tr>
          <td><br /></td>
          <td><br /></td>
        </tr>
      </tbody>
    );
  }
  render() {
    return (
      <table className="table">
        <thead>
          {this.tableHeader()}
        </thead>
        {this.tableBody()}
      </table>
    );
  }
}

export default DataTable;
