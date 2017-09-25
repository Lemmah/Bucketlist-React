import React, { Component } from 'react'
import axios from 'axios'

const api_url = "http://localhost:5000"

class Bucketlist extends Component{
	constructor(){
		super();
		this.state = {
			bucketlistItems: null,
		}
	}

	getAllBucketlistItems(bucketlistId){
		axios.get(api_url + "/bucketlists/" + bucketlistId + "/items", {
			headers: {
				'Authorization': 'Bearer ' + this.props.token,
				'Content-Type': 'application/json',
			}
		})
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
	}

	displayItems(id){
		console.log(id);
		this.getAllBucketlistItems(id);
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
					{this.props.bucketlists.map((bucketlist) => {
					   return (
					   	<li onClick={this.displayItems.bind(this, bucketlist.id)} 
					   			key={bucketlist.id}
					   			className="list-group-item"
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