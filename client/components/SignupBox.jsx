import React, { Component } from 'react';
// import css here

class SignupBox extends Component{
  constructor() {
    super();
    this.state = {usersArray: []}; // setState();
    // this.getUsers = this.getUsers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.getUsers();
  }

  onSubmit(event){
    event.preventDefault();
    // make a post request to server backend /login with username and password in the request body
    const port = 3000; // process.env.NODE_ENV === 'development' ? 3000 : 8080;
    const url = `http://localhost:${port}/user/signup`;
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

  render(){
    return (
      <div id="SignupBox">
        <form id="signupForm" onSubmit={this.onSubmit}>
            <div id='signUpContainer'>
            <input className="input signUpInput inputFields" name="username" id="usernameInput" type="text" placeholder='username'></input>
            <input className="input signUpInput inputFields" name="password" id="passwordInput" type="password" placeholder='password'></input>
            <input className="input signUpInput inputFields" name="nickname" id="nicknameInput" type="text" placeholder='nickname'></input>
            <input className="input signUpInput inputFields" name="email" id="emailInput" type="email" placeholder='email'></input>
            <input type="checkbox" id="tos" name="tos" defaultChecked={ this.props.checked } />
            <label htmlFor="tos">I agree to the <a href='https://en.wikipedia.org/wiki/Terms_of_service' target="_blank">terms of service</a></label>
            <button className='loginButton' type="submit">Sign up</button>
            </div>
        </form>
      </div>
    )
  };
};

export default SignupBox;