import React from 'react';
import SearchBar from './components/SearchBar';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import CurrentWeather from './components/CurrentWeather.jsx';
import './styles/Dashboard.css';
import RemoveFavButton from './components/RemoveFavButton.jsx';
import FavWeather from './components/FavWeather.jsx';
import { Navigate } from 'react-router-dom'

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
    favorites: [...state.main.favorites]
    }
};

const mapDispatchToProps = dispatch => ({
    // create functions that will dispatch action creators
    dispatchSearchLocation: (newSearchLocation) => {
      dispatch(actions.searchForLocation(newSearchLocation));
    }, 
    dispatchAddFavorite: (location) => {
      dispatch(actions.addFavorite(location));
    }

});

const Dashboard = (props) => {

  console.log('PROPS: ', props);

  const addToFavorites = () => {
    fetch('/user/setFavorites', {    //determine where to send after setting up backend routes in controller
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: props.userId, // changed this from props.username_id, that wasnt a valid prop
            city: props.city,
            state: props.stateName,
            country: props.country
        })
    })
    .then(data => data.json())
    .then(data => {
        console.log("57 DATA: ", data) // <<<<<<<---------- we want to seee this
        //invoke dispatch here
        // use a for loop to iterate thru data and pass to dispAddFav on each iter
        //let lastFav = data[data.length - 1];
        for (let i = 0; i < data.length; i++) {
          props.dispatchAddFavorite(data[i]);
        }
        // props.dispatchAddFavorite(lastFav)
        // apiCall()
        //
        // return <Navigate to="/dashboard" />
    })
    .catch(error => console.log('error: ', error))
  } //addToFavorites

/* 
this is favorites
[
    {
        "favorite_id": 25,
        "city": "Portland",
        "state": "Oregon"
    }
]
*/
  // iterate through array of favorites from the state
  const favComponents = [];

  console.log('favorites.length: ', props.favorites.length);

  for (let i = 0; i < props.favorites.length; i++) {
    const favoritePlace = props.favorites[i] // <- current favorite {city: '' , state: ''}
    favComponents.push(
      <div className="card">
        <FavWeather favoritePlace={favoritePlace} favPlaceIndex={i} key={i}/>
        <RemoveFavButton removeId={favoritePlace.favorite_id} />
      </div>
    )

    // favComponents.push(<FavWeather favoritePlace={favoritePlace} favPlaceIndex={i} key={i}/>);
    // favComponents.push(<RemoveFavButton removeId={favoritePlace.favorite_id} />);
    // currentAQI currentTemp currentWindSpeed
  }

  // console.log('favComponents: ', favComponents);
  // console.log('CODESMITH BLAHAHAHA ', props.favorites)

  // for (let i = 0; i< props.favorites.length; i++) {
  //   const favoritePlace = props.favorites[i] // <- current favorite {city: '' , state: ''}
  //   fetch(`http://api.airvisual.com/v2/city?city=${favoritePlace.city}&state=${favoritePlace.state}&country=USA&key=${process.env.API_KEY}`)
  //   .then(data => data.json())
  //   .then((data) => {
  //     console.log('data: ', data);
  //     // we need to update state with API fetch results here
  //     const dispatchData = {
  //       temp: data.data.current.weather.tp,
  //       aqi: data.data.current.pollution.aqius,
  //       wind: data.data.current.weather.ws,
  //       index: i
  //     };
  //     //pass dispacth data to userFavorites
  //     // use index to figure out which element of favorites[] to update with weather
  //     // this.props.dispatchUpdateFavorites()
  //   })
  //   .catch(error => console.log('error with api fetch (favorites): ', error));
  // }
  // make api request with each favorite location -> take the results from that api response
  // drill it down to -> create instances of components displaying weather info for each fav place
  return (
    <div id='dashboard'>
      <h1>Welcome, {props.nickname}!</h1>
      <SearchBar dispatchSearchLocation={props.dispatchSearchLocation}/>
      <p>Your Forecast:</p>
      <CurrentWeather username={props.username} city={props.city} state={props.stateName} country={props.country} currentTemp={props.currentTemp} currentAQI={props.currentAQI} currentWindSpeed={props.currentWindSpeed} />
      <button id='setFavorite' onClick={addToFavorites}>Add To Favorites</button>

      <div className="fav">
        {favComponents} 
      </div>

    </div>
  )
  };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);