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
                country: props.country
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
                <li>Temperature: {props.currentTemp} </li>
                <li>AQI: {props.currentAQI}</li> 
                <li>WindSpeed: {props.currentWindSpeed}</li>        
            </ol>
            <button id='setlocation' onClick={primaryLocation}>Set Primary Location</button>
        </div>
    )
}

export default CurrentWeather