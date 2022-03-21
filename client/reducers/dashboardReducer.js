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
        
        const newObj = {
            ...state,
            city, 
            stateName, 
            country,
            currentTemp: temp, 
            currentAQI: airQ, 
            currentWindSpeed: wind
            }
        
        console.log('updated state: ', newObj)
        return newObj
        }

        case types.STORE_USERINFO: {
            console.log('Payload: ', action.payload);
            const {userId, nickname } = action.payload;

            return {
                ...state,
                userId,
                nickname
            }
        }

        case types.ADD_FAVORITE: {
            
        }

        default: {
            return state;
          }
    }
}

export default dashboardReducer