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
import { useNavigate } from 'react-router-dom';
import SignUp from '../SignUp';
import { Link } from 'react-router-dom'


class LoginBox extends Component{
  

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.onSubmit = this.onSubmit.bind(this);
    // this.sendToSignUp = this.sendToSignUp.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    // make a post request to server backend /login with username and password in the request body
    const port = 3000 // process.env.NODE_ENV === 'development' ? 3000 : 8080;
    const url = `http://localhost:${port}/login`;
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
      if (fetchStatus === 200) console.log('login successful');
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

  render(){
    return (
      <div id="LoginBox">
        <form id="loginForm" >
          <div className="inputContainer">
          <span>Username: </span> <input name="username" id="usernameInput" type="text"></input>
          </div>
          
          <div className="inputContainer">
          <span>Password: </span> <input name="password" id="passwordInput" type="password"></input>
          </div>
       
          <button className='loginButton' type="submit" onSubmit={this.onSubmit}>Log In</button>
        </form>

        <form id="signupRequest" >
          {/* <button className='signUpButton' type="submit" onSubmit={this.sendToSignUp}>Sign Up</button>
          </form>
      </div>
    )
  };
}; */}
<Link style={{backgroundColor: '#808080',
  color: 'white',
  borderRadius: '12px',
  border: 'none',
  lineHeight: '2rem',
  width: '100px',
  fontWeight: 'bold'}} to={'/signup'}>Sign Up</Link>
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

export default LoginBox;