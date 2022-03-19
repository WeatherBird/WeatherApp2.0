import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.js';
import store from './store/store.js';

// const pages = {
//   loginPage: <Login />,
//   signupPage:<Signup />,
//   webapp: <Provider store={store}><App /></Provider>
// };

// let renderedComponent;
// if (response.cookie) this.setState({currentPage: 'webapp'});
// else this.setState({currentPage: 'loginPage'});

// ReactDOM.render(
//   pages[this.state.currentPage]
//   , // the redux page is the weatherapp

//   document.getElementById('root')

// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , 
  document.getElementById('root')
);
