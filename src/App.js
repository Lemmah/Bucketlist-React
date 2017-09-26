import React, { Component } from 'react';
import NavigationBar from './Components/Commons/NavigationBar';
import PageLayout from './Components/Commons/PageLayout';
import Footer from './Components/Commons/Footer'
import axios from 'axios';


const api_url = "http://localhost:5000";
const initialAppState = {
			authenticated: false,
			loginError: null,
			registrationError: null,
		}

class App extends Component {
	constructor(props){
		super(props);
		this.state = initialAppState
	}

	resetState(){
		this.setState(initialAppState);
	}

	handleRegister(credentials){
		this.resetState();
		axios.post(api_url + "/auth/register", credentials)
    .then((response) => {
      console.log(response.data);
      this.handleLogin(credentials);
    })
    .catch((error) => {
      console.log(error.response.data);
      this.setState({
      	registrationError: error.response.data.error,
      	loginError: null,
      	authenticated: false,
      });
    });
	}

	handleLogin(credentials){
		this.resetState();
		axios.post(api_url + "/auth/login", credentials)
    .then((response) => {
      console.log(response.data.message);
      this.setState({
      	authenticated: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data.error);
      this.setState({
      	loginError: error.response.data.error,
      	registrationError: null,
      	authenticated: false,
      });
    });
	}

	handleLogout(){
		this.resetState();
	}

	render() {
		return (
		  <div className="App">
		  	<NavigationBar
		  		authenticated={this.state.authenticated}
		  		onLogin={this.handleLogin.bind(this)}
		  		loginError={this.state.loginError}
		  		onLogout={this.handleLogout.bind(this)}
		  	/>
		  	<div className="container">
			  	<PageLayout 
			  		authenticated={this.state.authenticated}
			  		onRegister={this.handleRegister.bind(this)}
			  		registrationError={this.state.registrationError}
			  	/>
		  	</div>
		  	<Footer />
		  </div>
		);
	}
}

export default App;
