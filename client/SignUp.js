import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupBox from './components/SignupBox.jsx';

export default function Test() {
  return (
    <div id='signupPage'>
      <h1>This is Signup</h1>
      <SignupBox />
    </div>
  )
};

/**
  class Signup extends Component {
  constructor() {
    super();
    this.state = {usersArray: []}; // setState();
    this.getUsers = this.getUsers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getUsers();
  }

  getUsers() {
    // make a post request to server backend /login with username and password in the request body
    const port = 3000; // process.env.NODE_ENV === 'development' ? 3000 : 8080;
    const url = `http://localhost:${port}/signup`;
    fetch(url, { // <- returns a response asynchronously
      method: 'GET' // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors',
      // credentials: 'same-origin', // include, *same-origin, omit
    })
    .then((response) => {
      if (response.status !== 200) console.log(response), alert('User fetch error');
      return response.json();
    })
    .then((data) => {
      // set the state's users array to the data's users array
      // console.log(typeof data);
      // console.log(data);
      this.setState({usersArray: data});
      // console.log('current state:');
      // console.log(this.state.usersArray);
    });
  }
  
  onSubmit(event){
    event.preventDefault();
    // make a post request to server backend /login with username and password in the request body
    const port = process.env.NODE_ENV === 'development' ? 3000 : 8080;
    const url = `http://localhost:${port}/signup`;
    const signupObject = {
      username: event.target.username.value,
      password: event.target.password.value,
      nickname: event.target.nickname.value,
      email: event.target.email.value,
      tos: String(event.target.tos.checked)
    };
    // console.log(`the signup object looks like: ${JSON.stringify(signupObject)}`);
    fetch(url, { // <- returns a response asynchronously
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors',
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(signupObject) // body data type must match "Content-Type" header
    })
    .then((response) => {
      if (response.status !== 200) {
        // console.log(response);
        console.log('Signup Error');
      }
      return response.json();
    })
    .then((data) => {
      if (data.err) {
        if (data.err.code === 11000) alert('Username taken');
        else alert('Sign-up error!');
        return;
      } else alert('Sign-up successful');
      // handle response
      // console.log(data);
      this.getUsers();
      // const myHookValue = this.props.myHookValue;
      // return <div>{myHookValue}</div>;
    });
  }

  render() {
    return (
      <div>
        <span>Return to the </span><a href='/'>login</a><span> page</span>
        <SignupBox formSubmit={this.onSubmit}/>
        <CurrentUsers usersData={this.state.usersArray} />
      </div>
    ); // <ComponentName attributeName=value />
  }
}

// render the top level react component
render(<Signup />, document.getElementById('root')); // withHook()
 */