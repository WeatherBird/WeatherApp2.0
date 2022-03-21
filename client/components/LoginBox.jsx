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
        console.log(data);
        if (fetchStatus === 200) {
          console.log('login successful');
          this.setState({ ...this.state, loggedIn: true });
          // store username in state
          // data.users.username
          this.props.dispatchUsernameStorage({userId: data.username_id, nickname: data.nickname});
          // defaulting country to usa
          // the api call below should ideally use the user's IP address to find their nearest location
          // if (data.city !== null) apiCall(data.city, data.state, 'USA', this.props.dispatchSearchLocation);
          fetch(`http://api.airvisual.com/v2/nearest_city?key=${process.env.API_KEY}`)
            .then(data => data.json())
            .then((data) => {
              console.log('data: ', data);
              // searchForLocation(data)
              // save the favorites list of this user returned from the backend on a successful login
              this.props.dispatchSearchLocation(data);
            })
            .catch(error => console.log('error in api get request: ', error));
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
        <h1 id='loginHeader'>Breathe Better Air™</h1>
        <form id="loginForm" onSubmit={this.onSubmit}>
          <div className="inputContainer">
            {/* <span>Username: </span>  */}
            <input name="username" id="loginUsernameInput" type="text" placeholder='username'></input>
          </div>

          <div className="inputContainer">
            {/* <span>Password: </span>  */}
            <input name="password" id="loginPasswordInput" type="password" placeholder='password'></input>
          </div>
          <div className='buttonContainer'> 
            <button className="loginPageButton" type="submit" >Log In</button>

            <Link className="loginPageButton" to={'/signup'}>Sign Up</Link>
          </div>
        </form>
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
