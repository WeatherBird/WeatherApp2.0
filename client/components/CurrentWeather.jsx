import React from 'react';
import '../styles/CurrentWeather.css';

const mapDispatchToProps = dispatch => ({
    // create functions that will dispatch action creators
    dispatchAddFavorite: (location) => {
      dispatch(actions.addFavorite(location));
    }
});
  
const CurrentWeather = (props) => {
    const addToFavorites = () => {
        fetch('/server', {
            method: 'POST',
            body: JSON.stringify({
                userId: props.username_id,
                city: props.city,
                state: props.state,
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            //invoke dispatch here
            props.dispatchAddFavorite(data)
            apiCall()
        })
        .catch(error => console.log('error: ', error))
    }
    

    return (
        !props.currentTemp ? null : 
        <div id='currentweather'>
            <ol>
                <li className="weatherlist">City: {`${props.city}`} </li> 
                <li className="weatherlist">Temperature: {`${(props.currentTemp * 9/5) + 32} °F`} </li>
                <li className="weatherlist">Air Quality Index: {props.currentAQI}</li> 
                <li className="weatherlist">Wind Speed: {`${props.currentWindSpeed} m/s`}</li>        
            </ol>
            {/* <Favorites favoritesTemp={}/> */}
        </div>
    )
}

export default CurrentWeather;