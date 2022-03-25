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

    const getAQIColor = (aqi) => {
        if (aqi > 0 && aqi < 50) {
            return 'green';
        }
        if (aqi >= 50 && aqi < 100) {
            return 'yellow';
        }
        if (aqi >= 100 && aqi < 150) {
            return 'orange';
        }
        if (aqi >= 150 && aqi < 200) {
            return 'red';
        }
        if (aqi >= 200 && aqi < 300 ) {
            return 'purple';
        }
        if (aqi >= 300 && aqi < 500) {
            return 'brown';
        }
    }
    const color = getAQIColor(props.currentAQI);

    if (props.currentAQI > 50) {
        badPollution = true;
    }
    return (
        !props.currentTemp ? null : 
        <div className={color}>
            <ol>
                <li className="weatherlist city">{`${props.city}`} </li> 
                <li className="weatherlist-country">{`${props.state}, ${props.country}`} </li> 
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