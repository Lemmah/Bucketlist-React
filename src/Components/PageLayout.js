import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import RegistrationForm from './RegistrationForm'
import axios from 'axios'

const api_url="http://localhost:5000"

class PageLayout extends Component{
	constructor(){
		super();
		this.state = {
			username: null,
			bucketlists: null,
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
				});
				this.getAllBucketlists(token);
				console.log("Changed")
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
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
	}

	rowContent(){
		if(this.props.authenticated){
			console.log("authenticated")
			return (
				<Row>
		      <Col xs={12} md={8}>Authenticated</Col>
		      <Col xs={12} md={4}>...</Col>
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