import React, { Component, useEffect } from 'react';

export const apiCall = (city, state, country, dispatchSearchLocation) => {
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
        let country = document.getElementById("country").value
        apiCall(city, state, country, props.dispatchSearchLocation)
    }

    return (
        <div id='dashboard'>
            <input id='city' type='text' />
            <input id='state' type='text' />
            <input id='country' type='text'  />
            <button onClick={clickSearch}>Search</button>
        </div>
    )
}

export default SearchBar