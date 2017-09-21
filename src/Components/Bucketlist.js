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

	componentWillReceiveProps(nextProps){
		console.log("Receives Props");
	}

	getAllBucketlistItems(token, bucketlistId){
		axios.get(api_url + "/bucketlists/" + bucketlistId, {
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json',
			}
		})
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
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
					{this.props.bucketlists.map(function(bucketlist) {
					   return (
					   	<li key={bucketlist.id}
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