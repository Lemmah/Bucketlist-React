import React, { Component } from 'react'


class Bucketlist extends Component{

	displayItems(bucketlist){
		console.log(bucketlist);
		this.props.getAllBucketlistItems(bucketlist);
	}

	createBucketlist(){
		const resourceUrl = "/bucketlists"
		let details = {
			"name": "Lemmah",
		}
		this.props.createBucketlist(resourceUrl,details);
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
				        		onClick={this.createBucketlist.bind(this)}
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
				        		onClick={this.createBucketlist.bind(this)}
				        	>
									Create New
									</button>
								</th>
				      </tr>
				    </thead>
				    <tbody>
				      {this.props.bucketlists.map((bucketlist) => {
							   return (
							   	<tr onClick={this.displayItems.bind(this, bucketlist)} 
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
			</div>
		);
	}
}

export default Bucketlist;