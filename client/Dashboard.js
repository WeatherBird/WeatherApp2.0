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
    userId: state.main.userId,
    nickname: state.main.nickname,
    city: state.main.city, 
    stateName: state.main.stateName, 
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
  // iterate through array of favorites from the state
  const favComponents = [];

  for (let i = 0; i < props.favorites.length; i++) {
    const favoritePlace = props.favorites[i] // <- current favorite city
    favComponents.push(<CurrentWeather temp={favoritePlace.temp} stateName={favoritePlace.stateName} />);
    favComponents.push(<RemoveFavButton userId={favoritePlace.userId}removeId={favoritePlace.id} />);
  }
  // make api request with each favorite location -> take the results from that api response
  // drill it down to -> create instances of components displaying weather info for each fav place
    return (
      <div id='dashboard'>
        <h1>Welcome, {props.nickname}!</h1>
        <SearchBar dispatchSearchLocation={props.dispatchSearchLocation}/>
        <p>Your Forecast:</p>
        <CurrentWeather username={props.username} city={props.city} state={props.state} country={props.country} currentTemp={props.currentTemp} currentAQI={props.currentAQI} currentWindSpeed={props.currentWindSpeed} />
        {/* <button id='setFavorite' onClick={addToFavorites}>Add To Favorites</button> */}

        {/** an array of favorite places weather componenets */}
        {favComponents}
      </div>
    )
  };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);