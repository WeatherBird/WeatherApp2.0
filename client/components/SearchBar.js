import React, { Component, useEffect } from 'react';
import {searchForLocation} from '../actions/actions.js'

const SearchBar = () => {
    const clickSearch = (event) => {
        let city = document.getElementById("city").value
        // console.log('city: ', city)
        let state = document.getElementById("state").value
        // console.log('state: ', state)
        let country = document.getElementById("country").value


        fetch(`/http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${process.env.API_KEY}`)
        .then(data => data.json())
        .then((data) => {
            searchForLocation(data)
        })
        .catch(error => console.log('error in search bar get request: ', error))
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