import React from 'react';
import SearchBar from './components/SearchBar';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import CurrentWeather from './components/CurrentWeather.jsx';


const mapStateToProps = state => { 
    //redux state
    console.log('state: ', state)
    return {
    // add pertinent state here
    username: state.main.username,
    city: state.main.city, 
    state: state.main.state, 
    country: state.main.country,
    currentTemp: state.main.currentTemp, 
    currentAQI: state.main.currentAQI, 
    currentWindSpeed: state.main.currentWindSpeed,
    favorites: []
    }
};

const mapDispatchToProps = dispatch => ({
    // create functions that will dispatch action creators
    dispatchSearchLocation: (newSearchLocation) => {
      dispatch(actions.searchForLocation(newSearchLocation));
    }
});
  

const Dashboard = (props) => {
    return (
      <div id='dashboard'>
        <h1>Welcome</h1>
        <SearchBar dispatchSearchLocation={props.dispatchSearchLocation}/>
        <CurrentWeather username={props.username} city={props.city} state={props.state} country={props.country} currentTemp={props.currentTemp} currentAQI={props.currentAQI} currentWindSpeed={props.currentWindSpeed} />
      </div>
    )
  };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);