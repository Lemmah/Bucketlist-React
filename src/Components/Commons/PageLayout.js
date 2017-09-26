import React from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import RegistrationForm from './../Authentication/RegistrationForm'
import Bucketlist from './../Bucketlists/Bucketlist'
import BucketlistItem from './../Bucketlists/BucketlistItem'
import Requests from './../APICalls/Config'


class PageLayout extends Requests{
	constructor(){
		super();
		this.state = {
			token: null,
			username: null,
			bucketlists: null,
			items: null,
			bucketlistOnFocus: null,
		}
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
				console.log("Bucketlists Present");
				console.log(":>>>", prevState.bucketlists);
				if(!prevState.bucketlists){
					let firstBucketlist = document.getElementsByClassName("bucketlist")[0];
					console.log("Bucketlists Change")
					firstBucketlist.click();
				}
			}
		}
	}

	registerUser(credentials){
    this.props.onRegister(credentials);
	}

	createBucketlist(resourceUrl, details){
		this.props.onCreateBucketlist(resourceUrl, details);
	}

	getAllBucketlists(token){
		const resource_name = "bucketlists";
		const resource_url = "/bucketlists";
		this.getResource(resource_name, resource_url, token);
	}

	getAllBucketlistItems(bucketlist){
		const resource_name = "items";
		const resource_url = "/bucketlists/" + bucketlist.id + "/items";
		this.getResource(resource_name, resource_url, this.state.token);
		this.setState({
      	bucketlistOnFocus: bucketlist.name,
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
		      		createBucketlist={this.createBucketlist.bind(this)}
		      	/>
		      </Col>
		      <Col xs={12} md={8}>
		      	<BucketlistItem
		      		bucketlistName={this.state.bucketlistOnFocus}
		      		items={this.state.items}
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