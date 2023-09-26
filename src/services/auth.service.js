// src/services/auth.service.js

import axios from 'axios';

class AuthService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
      // We set our API's base URL so that all requests use the same base URL
    });

// ******************************** Interceptor Explained *****************************************  
// ************************************************************************************************

//Before Request Sent: When you use an interceptor for authentication, it intercepts the request 
// before it is sent to the server. This is where you check if the user is authenticated and has 
// an authentication token.

// Adding Authentication Token: If the user is authenticated, you add the authentication token to the 
// request headers. This is done automatically by the interceptor.

// Proceed with Request: After adding the authentication token, the interceptor allows the request to 
// proceed as usual. The request is then sent to the server with the necessary authentication headers.

// ************************************************************************************************
// ************************************************************************************************


    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = requestBody => {
    return this.api.post('/auth/login', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };

  signup = requestBody => {
    return this.api.post('/auth/signup', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  verify = () => {
    return this.api.get('/auth/verify');
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };
}

// Create one instance object
const authService = new AuthService();

export default authService;
