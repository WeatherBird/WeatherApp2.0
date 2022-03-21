import * as types from '../constants/actionTypes';

const initialState = {
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
            const temp = payload.data.current.aqius
            const airQ = payload.data.current.tp
            const wind = payload.data.current.ws
        
        return {
            ...state,
            currentTemp: temp, 
            currentAQI: airQ, 
            currentWindSpeed: wind
            }

        }

        default: {
            return state;
          }
    }
}

export default dashboardReducer