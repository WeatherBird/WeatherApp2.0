/**
 * ************************************
 *
 * @module  Login.js
 * @author  David Kim
 * @date    3/19/2022
 * @description presentation component that renders a single box with log-in forms
 *
 * ************************************
 */
import React, { Component } from 'react';
import SignUp from '../SignUp';
import { Link, Navigate } from 'react-router-dom'
import { apiCall } from './SearchBar.js'
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = dispatch => ({
  // create functions that will dispatch action creators
  dispatchSearchLocation: (newSearchLocation) => {
    dispatch(actions.searchForLocation(newSearchLocation));
  },

  dispatchUsernameStorage: (username) => {
    dispatch(actions.storeUserData(username))
  }
});

class LoginBox extends Component {


  constructor(props) {
    super(props);
    this.state = { username: '', password: '', loggedIn: false };
    this.onSubmit = this.onSubmit.bind(this);
    // this.sendToSignUp = this.sendToSignUp.bind(this);
  }

  onSubmit(event) {
    console.log('Inside onSubmit')
    event.preventDefault();
    // make a post request to server backend /login with username and password in the request body
    const port = 3000 // process.env.NODE_ENV === 'development' ? 3000 : 8080;
    const url = `http://localhost:${port}/user/login`;
    const loginObject = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    let fetchStatus;
    fetch(url, { // <- returns a response asynchronously
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors',
      credentials: "include", // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      // redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(loginObject) // body data type must match "Content-Type" header
    })
      .then((response) => {
        // console.log(response);
        fetchStatus = response.status;
        return response.json();
      })
      .then((data) => {
        //server should send user profile info
        //access primary location key 
        //make api call with location key 
        //use returned data to set state

        //after post request is sent, db will respond with posted data
        if (fetchStatus === 200) {
          console.log('login successful');
          this.setState({ ...this.state, loggedIn: true })
          //store username in state
          data.users={username: 'abc123'}
          this.props.dispatchUsernameStorage(data.users.username)
          apiCall(data.users.city, data.users.state, data.users.country, this.props.dispatchSearchLocation)
        }
        else alert('Login error');
      });
  }


  // sendToSignUp(event) {
  //   // handle routing here
  //   const navigate = useNavigate();
  //   event.preventDefault();
  //   const routeChange = () =>{
  //     let path = '/signup';
  //     navigate(path);
  //   }
  //   routeChange();
  // }
  
  render() {
    console.log('loggedIn: ', this.state.loggedIn)
    return this.state.loggedIn ? <Navigate to="/dashboard" /> : (
      <div id="LoginBox">
        <form id="loginForm" onSubmit={this.onSubmit}>
          <div className="inputContainer">
            <span>Username: </span> <input name="username" id="usernameInput" type="text"></input>
          </div>

          <div className="inputContainer">
            <span>Password: </span> <input name="password" id="passwordInput" type="password"></input>
          </div>

          <button className='loginButton' type="submit" >Log In</button>
        </form>

        <Link style={{
          backgroundColor: '#808080',
          color: 'white',
          borderRadius: '12px',
          border: 'none',
          lineHeight: '2rem',
          width: '100px',
          fontWeight: 'bold'
        }} to={'/signup'}>Sign Up
        </Link>

      </div>
    )

  };
};

// const buttonStyle = {
//   backgroundColor: '#808080',
//   color: 'white',
//   borderRadius: '12px',
//   border: 'none',
//   lineHeight: '2rem',
//   width: '100px',
//   fontWeight: 'bold'
// }

export default connect(null, mapDispatchToProps)(LoginBox);
