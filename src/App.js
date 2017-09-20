import React, { Component } from 'react';
import './App.css';
import NavigationBar from './Components/NavigationBar'
import PageLayout from './Components/PageLayout'

class App extends Component {
	constructor(){
		super();
		this.state = {
			authenticated: false,
		}
	}

	authenticate(){
		return null;
	}

	render() {
		return (
		  <div className="App">
		  	<NavigationBar 
		  		authenticated={this.authenticate()}
		  	/>
		  	<PageLayout 
		  		authenticated={this.authenticate()}
		  	/>
		  	{/*<Footer />*/}
		  </div>
		);
	}
}

export default App;
