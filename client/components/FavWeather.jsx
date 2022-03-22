import React from 'react';
import '../styles/CurrentWeather.css';
import { connect } from 'react-redux';

// const mapDispatchToProps = dispatch => ({
//     // create functions that will dispatch action creators
//     dispatchAddFavorite: (location) => {
//       dispatch(actions.addFavorite(location));
//     }
// });

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
/**
 * 
 * {currentTemp={data.current.weather.tp} currentAQI={data.current.pollution.aqius} currentWindSpeed={data.current.weather.ws}} props 
 * 
 */
const FavWeather = (props) => {
    const favPlaceIndex = props.favPlaceIndex;
    console.log('favPlaceIndex: ', favPlaceIndex);
    let badPollution = false;
    console.log('props.favorites: ', props.favorites);
    const currentFavoritePlace = props.favorites[favPlaceIndex];
    console.log('currentFavoritePlace: ', currentFavoritePlace);
    if (props.currentAQI > 50) {
        badPollution = true;
    }
    return (
        !props.currentTemp ? null : 
        <div id='currentweather'>
            <ol>
                <li className="weatherlist city">City: {`${props.city}`} </li> 
                <li className="weatherlist">Temperature: {`${(currentFavoritePlace.currentTemp * 9/5) + 32} °F`} </li>
                <li className="weatherlist">Air Quality Index: {currentFavoritePlace.currentAQI}</li> 
                <li className="weatherlist">Wind Speed: {`${currentFavoritePlace.currentWindSpeed} m/s`}</li>
                <li className="weatherlist">Mask needed?{badPollution ? ' Yes  😢  😢  😢' : ' No 🥳  🥳  🥳'} </li>
                <li className="weatherlist">Stay at Home?{badPollution ? ' Recommended to stay indoor ' : ' Go outside and enjoy the sun!!'} </li>
            </ol>
            {/* <Favorites favoritesTemp={}/> */}
        </div>
    )
}

export default connect(mapStateToProps, null)(FavWeather);