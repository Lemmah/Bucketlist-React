import React, { Component } from 'react'

class DataTable extends Component {
	render(){
		console.log(this.props)
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
	}
}

export default DataTable