import { Component } from 'react';
import axios from 'axios';

const apiUrl = 'https://lemmah-bucketlist-api.herokuapp.com';
const initialAppState = {
  authenticated: false,
  loginError: null,
  registrationError: null,
  newBucketlist: null,
  newBucketlistItem: null,
};

const setHeaders = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

class Requests extends Component {
  constructor() {
    super();
    this.state = initialAppState;
  }

  getResource(resourceName, resourceUrl, token) {
    axios.get(apiUrl + resourceUrl, setHeaders(token))
      .then((response) => {
        const configs = this.state;
        configs[resourceName] = (response.data.message.length > 0 ?
          response.data.message :
          null
        );
        this.setState(configs);
      })
      .catch(error => error);
  }

  authenticate(endPoint, credentials) {
    axios.post(apiUrl + endPoint, credentials)
      .then((response) => {
        let responseData = response.data.message,
          registrationMsg = 'registered successfully';
        if (responseData.info === undefined) {
          if (responseData.includes(registrationMsg)) {
            this.handleLogin(credentials);
          }
        } else {
          this.setState({
            authenticated: response.data,
          });
        }
      })
      .catch((error) => {
        let desiredEndPoint = endPoint,
          resource = 'register';
        if (desiredEndPoint.includes(resource)) {
          this.setState({
            registrationError: error.response.data.error,
            loginError: null,
            authenticated: false
          });
        } else {
          this.setState({
            loginError: error.response.data.error,
            registrationError: null,
            authenticated: false,
          });
        }
      });
  }

  resetState() {
    this.setState(initialAppState);
  }

  createResource(resourceType, resourceUrl, details) {
    const token = this.state.authenticated.message.access_token;
    const headers = setHeaders(token);
    const payload = details;
    axios.post(apiUrl + resourceUrl, payload, headers)
      .then((response) => {
        // eslint-disable-next-line
        (resourceType === 'bucketlist' ?
          this.setState({
            newBucketlist: response.data,
            newBucketlistItem: null,
          })
          :
          this.setState({
            newBucketlistItem: response.data,
            newBucketlist: null,
          }));
      })
      .catch(error => error);
  }

  // eslint-disable-next-line
  deleteResource(resourceUrl, token) {
    axios.delete(apiUrl + resourceUrl, setHeaders(token))
      .then(response => response.data)
      .catch(error => error);
  }

  // eslint-disable-next-line
  updateResource(resourceUrl, newDetails, token) {
    const headers = setHeaders(token);
    const payload = newDetails;
    axios.put(apiUrl + resourceUrl, payload, headers)
      .then(response => response.data)
      .catch(error => error);
  }
}


export default Requests;
