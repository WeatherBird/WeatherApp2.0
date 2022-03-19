import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupBox from './components/SignupBox.jsx';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/';
    navigate(path);
  }

  return (
    <div id='signupPage'>
      <h1>This is Signup</h1>
      <span>Return to the </span><button onClick={routeChange}>login page</button>
      <SignupBox />
    </div>
  )
};

/**
class Signup extends Component {
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