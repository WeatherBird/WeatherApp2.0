/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */
import { combineReducers } from 'redux';

// import all reducers here
// favorite places reducer
// friends list reducer
// import xReducer from './xReducer';
import dashboardReducer from './dashboardReducer'


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  main: dashboardReducer
});

// make the combined reducers available for import
export default reducers;
