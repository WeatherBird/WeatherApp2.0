import React, { Component, useEffect } from 'react';
import '../styles/SearchBar.css';


const apiCall = (city, state, country, dispatchSearchLocation) => {
    fetch(`http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${process.env.API_KEY}`)
    .then(data => data.json())
    .then((data) => {
        console.log('data: ', data)
        // searchForLocation(data)
        dispatchSearchLocation(data)
    })
    .catch(error => console.log('error in search bar get request: ', error))
}

const SearchBar = (props) => {
    const clickSearch = (event) => {
        let city = document.getElementById("city").value
        // console.log('city: ', city)
        let state = document.getElementById("state").value
        // console.log('state: ', state)
        let country = 'USA'
        apiCall(city, state, country, props.dispatchSearchLocation)
    }

    return (
        <div id='dashboard'>
            <label>Search a location: </label>
            <input className='currentWeather' id='city' type='text' placeholder='city' />
            <input className='currentWeather' id='state' type='text' placeholder='state'/>
            {/* <input id='country' type='text' /> */}
            <button className="searchBtn" onClick={clickSearch}>Search</button>
        </div>
    )
}

export default SearchBar