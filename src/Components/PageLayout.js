import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import RegistrationForm from './RegistrationForm'
import axios from 'axios'
import Bucketlist from './Bucketlist'
import BucketlistItem from './BucketlistItem'

const api_url="http://localhost:5000"


class PageLayout extends Component{
	constructor(){
		super();
		this.state = {
			token: null,
			username: null,
			bucketlists: null,
			bucketlistItems: null,
			bucketlistOnFocus: null,
		}
	} 

	registerUser(credentials){
    this.props.onRegister(credentials);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.authenticated){
			console.log("Received")
			if(nextProps.authenticated.message.user
				=== this.state.username){
				console.log("Unchanged");
				return;
			} else {
				const token = nextProps.authenticated.message.access_token;
				this.setState({
					username: nextProps.authenticated.message.user,
					token: token,
				});
				this.getAllBucketlists(token);
				console.log("Changed")
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		console.log(prevState.bucketlists);
		console.log(this.state.bucketlists);
		if(this.state.bucketlists){
			if(this.state.bucketlists.length > 0){
				console.log("Bucketlists Present")
				if(!prevState.bucketlists){
					let firstBucketlist = document.getElementsByClassName("bucketlist")[0];
					console.log("Bucketlists Change")
					firstBucketlist.click();
				}
			}
		}
	}

	getAllBucketlists(token){
		axios.get(api_url + "/bucketlists", {
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json',
			}
		})
    .then((response) => {
      this.setState({
      	bucketlists: response.data.message
      });
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
	}

	getAllBucketlistItems(bucketlist){
		axios.get(api_url + "/bucketlists/" + bucketlist.id + "/items", {
			headers: {
				'Authorization': 'Bearer ' + this.state.token,
				'Content-Type': 'application/json',
			}
		})
    .then((response) => {
			this.setState({
      	bucketlistItems: response.data.message,
      	bucketlistOnFocus: bucketlist.name,
      });
      console.log("Items reacieved: ",response.data.message);
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
	}

	rowContent(){
		if(this.props.authenticated){
			console.log("Authenticated");
			return (
				<Row>
		      <Col xs={12} md={4}>
		      	<Bucketlist 
		      		bucketlists={this.state.bucketlists}
		      		token={this.state.token}
		      		getAllBucketlistItems={this.getAllBucketlistItems.bind(this)}
		      	/>
		      </Col>
		      <Col xs={12} md={8}>
		      	<BucketlistItem
		      		bucketlistName={this.state.bucketlistOnFocus}
		      		bucketlistItems={this.state.bucketlistItems}
		      	/>
		      </Col>
		    </Row>
			);
		} else {
			return (
				<Row>
			      <Col xs={0} md={8}>
			      	<Image
			      		style={{maxHeight: 460}}
			      		src="dreams.jpg" responsive thumbnail
			      	/>
			      </Col>
			      <Col xs={12} md={4}>
			      	<RegistrationForm
			      		onRegister={this.registerUser.bind(this)}
			      		registrationError={this.props.registrationError}
			      	/>
			      </Col>
			  </Row>
			);
		}
	}

	render(){
		return (
			<section>
				<Grid>
					{this.rowContent()}
			  </Grid>
			</section>
		);
	}
}

export default PageLayout;