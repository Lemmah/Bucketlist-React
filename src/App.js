import React from 'react';
import NavigationBar from './Components/Commons/NavigationBar';
import PageLayout from './Components/Commons/PageLayout';
import Footer from './Components/Commons/Footer';
import Requests from './Components/APICalls/Config';

class App extends Requests {
  handleRegister(credentials) {
    this.resetState();
    const endPoint = '/auth/register';
    this.authenticate(endPoint, credentials);
  }


  handleLogin(credentials) {
    this.resetState();
    const endPoint = '/auth/login';
    this.authenticate(endPoint, credentials);
  }

  handleLogout() {
    this.resetState();
  }

  handleCreateBucketlist(resourceUrl, details) {
    const resourceType = 'bucketlist';
    this.createResource(resourceType, resourceUrl, details);
  }

  handleCreateBucketlistItem(resourceUrl, details) {
    const resourceType = 'bucketlistItem';
    this.createResource(resourceType, resourceUrl, details);
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
            newBucketlist={this.state.newBucketlist}
            newBucketlistItem={this.state.newBucketlistItem}
            authenticated={this.state.authenticated}
            onRegister={this.handleRegister.bind(this)}
            registrationError={this.state.registrationError}
            onCreateBucketlist={this.handleCreateBucketlist.bind(this)}
            onCreateBucketlistItem={this.handleCreateBucketlistItem.bind(this)}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
