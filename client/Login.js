import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import './styles/Login.css';
import LoginBox from './components/LoginBox.jsx';
import SearchBar from './components/SearchBar';

// import { Link } from 'react-router-dom';
// <Link to='/signup'>here</Link>
// <span>Don't have an account? Sign up <a href='/login'>here</a></span>
const Login = () => {
  return (
    <div id='loginPage'>
      {/* <h1>This is Login</h1> */}
      <LoginBox />
    </div>
  )
};

export default Login;
