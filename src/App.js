import React from 'react'
import NavigationBar from './Components/Commons/NavigationBar'
import PageLayout from './Components/Commons/PageLayout'
import Footer from './Components/Commons/Footer'
import Requests from './Components/APICalls/Config'

class App extends Requests {
  handleRegister (credentials) {
    this.resetState()
    const endPoint = '/auth/register'
    this.authenticate(endPoint, credentials)
  }

  /* Remove this after I'm done with implementing
   inner functionality
  */
  componentDidMount () {
    const credentials = {
      'email': 'jnlemayian@gmail.com',
      'password': 'easyPass'
    }
    this.handleLogin(credentials)
  }

  handleLogin (credentials) {
    this.resetState()
    const endPoint = '/auth/login'
    this.authenticate(endPoint, credentials)
  }

  handleLogout () {
    this.resetState()
  }

  handleCreateBucketlist (resourceUrl, details) {
    this.createResource(resourceUrl, details)
  }

  handleCreateBucketlistItem (bucketlistId) {
    console.log('Bucketlist Item Created')
  }

  render () {
    return (
      <div className='App'>
        <NavigationBar
          authenticated={this.state.authenticated}
          onLogin={this.handleLogin.bind(this)}
          loginError={this.state.loginError}
          onLogout={this.handleLogout.bind(this)}
      />
        <div className='container'>
          <PageLayout
            authenticated={this.state.authenticated}
            onRegister={this.handleRegister.bind(this)}
            registrationError={this.state.registrationError}
            onCreateBucketlist={this.handleCreateBucketlist.bind(this)}
        />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
