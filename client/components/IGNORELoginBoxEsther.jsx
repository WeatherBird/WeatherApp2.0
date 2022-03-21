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

const LoginBox = () => {
  const [state, setState] = useState(0) //state starts at 0, call setState with 1 and the component with re-render
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmit = (event) => {
    console.log('button clicked')
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
      console.log('logged in')
      if (fetchStatus === 200) {
        console.log('login successful');
        navigate('/dashboard')
      }
      else alert('Login error');
    });
  }

  return (
      <div id="LoginBox">
        <form id="loginForm" >
          <div className="inputContainer">
          <span>Username: </span> <input name="username" id="usernameInput" type="text"></input>
          </div>
          
          <div className="inputContainer">
          <span>Password: </span> <input name="password" id="passwordInput" type="password"></input>
          </div>
       
          <button className='loginButton' type="submit" onClick={onSubmit}>look</button>
        </form>

        <form id="signupRequest" >
          {/* <button className='signUpButton' type="submit" onSubmit={this.sendToSignUp}>Sign Up</button> */}
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
  