import React, { Component } from 'react'
import CreateForm from './../Commons/CreateForm'


class Bucketlist extends Component{
	constructor(){
		super();
		this.state = {
			formShow: false,
		}

		this.formClose = this.formClose.bind(this);
		this.formOpen = this.formOpen.bind(this);
		this.createBucketlist = this.createBucketlist.bind(this);
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

	displayItems(bucketlist){
		this.props.getAllBucketlistItems(bucketlist);
	}

	createBucketlist(name){
		const resourceUrl = "/bucketlists"
		let details = {
			"name": name,
		}
		this.props.createBucketlist(resourceUrl,details);
		this.setState({
			formShow: false,
		});
	}

	displayBucketlists(){
		if(!this.props.bucketlists){
			return(
				<table className="table">
				    <thead>
				      <tr>
				        <th>Your Bucketlists</th>
				        <th>
				        	<button
				        		className="btn btn-success btn-xs"
				        		onClick={this.formOpen}
				        	>
									Create New
									</button>
								</th>
				      </tr>
				    </thead>
				    <tbody>
				      <tr>
				      	<td>No Bucketlists -</td>
				      	<td>
				      		Start by creating some.
				      	</td>
				      </tr>
				    </tbody>
				  </table>
			);
		} else {
			if(this.props.bucketlists.length > 0){
				return (
					<table className="table">
				    <thead>
				      <tr>
				        <th>Your Bucketlists</th>
				        <th>
				        	<button
				        		className="btn btn-success btn-xs"
				        		onClick={this.formOpen}
				        	>
									Create New
									</button>
								</th>
				      </tr>
				    </thead>
				    <tbody>
				      {this.props.bucketlists.map((bucketlist) => {
							   return (
							   	<tr 
							   			style={{ cursor: "pointer" }}
							   			onClick={this.displayItems.bind(this, bucketlist)} 
							   			key={bucketlist.id}
							   			className="bucketlist"
							   	><td>{bucketlist.name}</td><td></td></tr>);
							})}
				    </tbody>
				  </table>
				);
			} else {
				return(
					<ul className="list-group">
					  <strong>
								<center>
									Your Bucketlists
								</center>
							</strong>
						<li className="list-group-item"></li>
					  <li className="list-group-item">
					  	There are no Bucketlists here.
					  </li>
					  <li className="list-group-item"></li>
					</ul>
				);	
			}
		}
	}

	render(){
		return(
			<div>
				{this.displayBucketlists()}
				<CreateForm 
					show={this.state.formShow} 
					onHide={this.formClose}
					onCreateResource={this.createBucketlist}
				/>
			</div>
		);
	}
}

export default Bucketlist;