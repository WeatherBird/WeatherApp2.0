import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupBox from './components/SignupBox.jsx';
import { useNavigate } from 'react-router-dom';
import './styles/SignUp.css';

export default function Test() {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/';
    navigate(path);
  }

  return (
    <div id='signupPage'>
      <h1 id='loginHeader2'>Breathe Better Air™</h1>
      <SignupBox />
      <div id='titleAndButton'>
        <button className='returnBlurb' onClick={routeChange}>Back to login</button>
      </div>
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