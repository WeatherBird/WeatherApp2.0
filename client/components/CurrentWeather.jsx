import React from 'react';

const CurrentWeather = (props) => {

    const primaryLocation = () => {
        console.log('hit primarylocation onclick func')
        fetch('/server', {
            method: 'POST',
            body: JSON.stringify({
                username: props.username,
                city: props.city,
                state: props.state,
            })
        })
        .then(data => data.json())
        // .then(data => console.log(data))
        .catch(error => console.log('error: ', error))
    }

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
        // .then(data => console.log(data))
        .catch(error => console.log('error: ', error))
    }
    

    return (
        !props.currentTemp ? null : 
        <div id='currentweather'>
            Today's Forecast:
            <ol>
                <li>Temperature: {`${(props.currentTemp * 9/5) + 32} °F`} </li>
                <li>Air Quality Index: {props.currentAQI}</li> 
                <li>Wind Speed: {`${props.currentWindSpeed} m/s`}</li>        
            </ol>
            <button id='setlocation' onClick={primaryLocation}>Set Primary Location</button>
            <button id='setFavorite' onClick={addToFavorites}>Add To Favorites</button>

        </div>
    )
}

export default CurrentWeather;