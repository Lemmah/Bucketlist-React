import React, { Component } from 'react'
import { Button, ButtonToolbar, Row, Col } from 'react-bootstrap'

const buttonsInstance = (
  <ButtonToolbar>
    <Button>A</Button>
    <Button bsStyle="primary">B</Button>
    <Button bsStyle="success">C</Button>
    <Button bsStyle="info">D</Button>
    <Button bsStyle="warning">E</Button>
    <Button bsStyle="danger">F</Button>
  </ButtonToolbar>
);

class BucketlistItem extends Component{

	displayBucketlistItem(){
		if(!this.props.bucketlistName){
			return (
				<ul className="list-group">
					<h3>
							<center>
								Welcome! Before you die...?
							</center>
						</h3>
				  <li className="list-group-item"></li>
				  <li className="list-group-item">
				  	You currently don't have any bucketlists! Maybe you should
				  	start by creating one then you items in it will appear here.
				  </li>
				  <li className="list-group-item"></li>
				</ul>
			);
		} else {
			if(!this.props.bucketlistItems.length > 0){
				return(
					<ul className="list-group">
						<h3>
							<center>
								{this.props.bucketlistName}
							</center>
						</h3>
					  <li className="list-group-item"></li>
					  <li className="list-group-item">
					  	There are no activities in here.
					  </li>
					  <li className="list-group-item"></li>
					</ul>
				);
			} else {
				return (
					<ul className="list-group">
						<Row>
			      	<Col xs={6} md={6}>
			      		<h3>
									<center>
										{this.props.bucketlistName}
									</center>
								</h3>
			      	</Col>
			      	<Col xs={6} md={6}>
			      		{buttonsInstance}
			      	</Col>
		      	</Row> 
						{this.props.bucketlistItems.map((bucketlistItem) => {
						   return (
						   	<li
						   			key={bucketlistItem.id}
						   			className="list-group-item bucketlistItem"
						   	>
						   	<Row>
						   		<Col md={6} sm={6}>
						   		{bucketlistItem.name}
						   		</Col>
						   		<Col md={6} sm={6} style={{textAlignment: "right"}}>{' '}
						   		<Button bsStyle="success">A</Button>{' '}
						   		<Button bsStyle="warning">E</Button>{' '}
						   		<Button bsStyle="danger">D</Button>{' '}
						   		</Col>
						   	</Row>
						   	</li>);
						})}
					</ul>
				);
			}
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