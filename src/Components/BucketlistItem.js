import React, { Component } from 'react'


class BucketlistItem extends Component{

	displayBucketlistItem(){
		if(!this.props.bucketlistItems){
			return(
				<ul className="list-group">
				  <li className="list-group-item"></li>
				  <li className="list-group-item">
				  	This Bucketlist is empty.
				  </li>
				  <li className="list-group-item"></li>
				</ul>
			);
		} else {
			return (
				<ul className="list-group"> 
						<h3>
							<center>
								{this.props.bucketlistName}
							</center>
						</h3>
					{this.props.bucketlistItems.map((bucketlistItem) => {
					   return (
					   	<li
					   			key={bucketlistItem.id}
					   			className="list-group-item bucketlistItem"
					   	>{bucketlistItem.name}</li>);
					})}
				</ul>
			);
		}
	}

	render(){
		return(
			<div>
				{this.displayBucketlistItem()}
			</div>
		);
	}
}

export default BucketlistItem;