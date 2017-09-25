import React, { Component } from 'react'


class Bucketlist extends Component{

	displayItems(bucketlist){
		console.log(bucketlist);
		this.props.getAllBucketlistItems(bucketlist);
	}

	displayBucketlists(){
		if(!this.props.bucketlists){
			return(
				<ul className="list-group">
				  <li className="list-group-item"></li>
				  <li className="list-group-item">
				  	There are no Bucketlists here.
				  </li>
				  <li className="list-group-item"></li>
				</ul>
			);
		} else {
			return (
				<ul className="list-group"> 
						<strong>
							<center>
								Your Bucketlists
							</center>
						</strong>
					{this.props.bucketlists.map((bucketlist) => {
					   return (
					   	<li onClick={this.displayItems.bind(this, bucketlist)} 
					   			key={bucketlist.id}
					   			className="list-group-item bucketlist"
					   	>{bucketlist.name}</li>);
					})}
				</ul>
			);
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