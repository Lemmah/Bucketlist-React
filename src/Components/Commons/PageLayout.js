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
			firstFocus: true,
		}
	} 

	componentWillReceiveProps(nextProps){
		let bucketlists = this.state.bucketlists;
		if(nextProps.newBucketlist){
			if(!bucketlists) {
				bucketlists = []
			}
				bucketlists.splice(0,0,nextProps.newBucketlist);
				this.setState({bucketlists: bucketlists})
		}

		let items = this.state.items;
		if(nextProps.newBucketlistItem){
			if(!items){
				items = []
			}
				items.push(nextProps.newBucketlistItem);
				this.setState({items: items})
		}
		if(nextProps.authenticated){
			if(nextProps.authenticated.message.user
				=== this.state.username){
				return;
			} else {
				const token = nextProps.authenticated.message.access_token;
				this.setState({
					username: nextProps.authenticated.message.user,
					token: token,
				});
				this.getAllBucketlists(token);
			}
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.bucketlists){
			if(this.state.bucketlists.length > 0){
				if(this.state.firstFocus){
					let firstBucketlist = document.getElementsByClassName("bucketlist")[0];
					firstBucketlist.click();
					this.setState({
						firstFocus: false,
					});
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

	createBucketlistItem(resourceUrl, details){
		this.props.onCreateBucketlistItem(resourceUrl, details);
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
      	bucketlistOnFocus: bucketlist,
    });
	}

	rowContent(){
		if(this.props.authenticated){
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
		      		bucketlist={this.state.bucketlistOnFocus}
		      		items={this.state.items}
		      		createBucketlistItem={this.createBucketlistItem.bind(this)}
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