import * as types from '../constants/actionTypes';

const initialState = {
    userId: '',
    nickname: '',
    city: '', 
    stateName: '', 
    country: '',
    currentTemp: '', 
    currentAQI: '', 
    currentWindSpeed: '',
    favorites: []
};

// {
//     "ts": "2017-02-01T03:00:00.000Z",  //timestamp
//     "aqius": 21, //AQI value based on US EPA standard
//     "aqicn": 7, //AQI value based on China MEP standard
//     "tp": 8, //temperature in Celsius
//     "tp_min": 6, //minimum temperature in Celsius
//     "pr": 976,  //atmospheric pressure in hPa
//     "hu": 100, //humidity %
//     "ws": 3, //wind speed (m/s)
//     "wd": 313, //wind direction, as an angle of 360° (N=0, E=90, S=180, W=270)
//     "ic": "10n" //weather icon code, see below for icon index
//   }, 

const dashboardReducer = (state = initialState, action) => {
    let favorites;
    switch (action.type) {
        case types.SEARCH_LOCATION: {
            console.log('hit reducer')
            const city = action.payload.data.city
            const stateName = action.payload.data.state
            const country = action.payload.data.country
            const temp = action.payload.data.current.weather.tp
            const airQ = action.payload.data.current.pollution.aqius
            const wind = action.payload.data.current.weather.ws
        
        const newState = {
            ...state,
            city, 
            stateName, 
            country,
            currentTemp: temp, 
            currentAQI: airQ, 
            currentWindSpeed: wind
            }
        
        console.log('updated state: ', newState)
        return newState
        }
        //sarah and ammar did store_userinfo
        case types.STORE_USERINFO: {
            console.log('Payload: ', action.payload);
            const {userId, nickname, city, state, country, favorites } = action.payload;
            console.log(state);
            return {
                ...state,
                userId,
                nickname,
                city,
                state,
                country,
                favorites
            }
        }

        case types.ADD_FAVORITE: {
            console.log("reducerPL: ", action.payload);
            const favoriteId = action.payload.favorite_id; // is this in the response object from API ??
            const favoriteCity = action.payload.city;
            const favoriteStateName = action.payload.state;
            // const favoriteCountry = action.payload.data.country;
            // const favoriteTemp = action.payload.data.current.weather.tp;
            // const favoriteAirQ = action.payload.data.current.pollution.aqius;
            // const favoriteWind = action.payload.data.current.weather.ws;

            const favObj = {
                id: favoriteId,
                city: favoriteCity, 
                stateName: favoriteStateName, 
                // country: favoriteCountry,
                // currentTemp: favoriteTemp, 
                // currentAQI: favoriteAirQ, 
                // currentWindSpeed: favoriteWind
                country: "USA",
                currentTemp: 42, 
                currentAQI: 22, 
                currentWindSpeed: 22
            };

            const newState = {
                ...state,
                favorites: state.favorites.concat(favObj) // can we .concat an obj onto an array ? .concat accepts arrays
                };
            
            console.log('updated state: ', newState);
            return newState;
        }

        case types.DELETE_FAVORITE: {
			// take the current favorties array
            
            // initialize a new empty array to be the next favorites array state
            const newArray = [];
            // iterate over the current fav array and push it to the next favorites array only if id !== deleted_id
            for (let i = 0; i < state.favorites.length; i++) {
                // each favorite is an object
                if (state.favorites[i].id !== action.payload) {
                    newArray.push(state.favorites[i]);
                }
            }
            // set state with new favorites array 
            const newState = {
                ...state,
                favorites: newArray
            };
            return newState;
        }
        //we are updating our current weather info for our favorites
        case types.UPDATE_FAVORITES: {
            /*
                const dispatchData = {
                    temp: data.data.current.weather.tp,
                    aqi: data.data.current.pollution.aqius,
                    wind: data.data.current.weather.ws,
                    index: i
                };
            */
            const userFavorites = action.payload;
                // // let upFav = {
                    // aqi: action.payload.aqi
                // }
            return {
                ...state, 
                favorites: userFavorites
            }
        }
		
        case types.API_FAVORITES: {
            const apiData = action.payload;

            const newFavorites = JSON.parse(JSON.stringify(state.favorites));

            newFavorites[apiData.index].currentTemp = apiData.temp;// currentAQI currentWindSpeed
            newFavorites[apiData.index].currentAQI = apiData.aqi;
			newFavorites[apiData.index].currentWindSpeed = apiData.wind;
            
            return {
                ...state,
                favorites: newFavorites
            }
        }

        default: {
            return state;
          }
    }
}

export default dashboardReducer