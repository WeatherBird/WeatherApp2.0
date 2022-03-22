import React from 'react';
import '../styles/CurrentWeather.css';

// const mapDispatchToProps = dispatch => ({
//     // create functions that will dispatch action creators
//     dispatchAddFavorite: (location) => {
//       dispatch(actions.addFavorite(location));
//     }
// });
  
const CurrentWeather = (props) => {
    let badPollution = false;

    if (props.currentAQI > 50) {
        badPollution = true;
    }
    return (
        !props.currentTemp ? null : 
        <div id='currentweather'>
            <ol>
                <li className="weatherlist city">City: {`${props.city}`} </li> 
                <li className="weatherlist">Temperature: {`${(props.currentTemp * 9/5) + 32} °F`} </li>
                <li className="weatherlist">Air Quality Index: {props.currentAQI}</li> 
                <li className="weatherlist">Wind Speed: {`${props.currentWindSpeed} m/s`}</li>
                <li className="weatherlist">Mask needed?{badPollution ? ' Yes  😢  😢  😢' : ' No 🥳  🥳  🥳'} </li>
                <li className="weatherlist">Stay at Home?{badPollution ? ' Recommended to stay indoor ' : ' Go outside and enjoy the sun!!'} </li>
            </ol>
            {/* <Favorites favoritesTemp={}/> */}
        </div>
    )
}

export default CurrentWeather;