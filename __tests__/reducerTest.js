import React from 'React';
//import '@testing-library/jest-dom';  //recommended but not needed
import {render, fireEvent, screen} from '@testing-library/react' 
import subject from '../client/reducers/dashboardReducer.js';

describe('Dashboard Reducer', () => {
  let state;
  
  beforeEach(() => {
    state = {
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
  });

  // afterEach(() =>{
  //   const state ={
  //     userId: '',
  //     nickname: '',
  //     city: '', 
  //     stateName: '', 
  //     country: '',
  //     currentTemp: '', 
  //     currentAQI: '', 
  //     currentWindSpeed: '',
  //     favorites: []
  //   }
  // })
  
  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    })
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajsbicawlbejckr' };
      expect(subject(state, action)).toBe(state);
    });
  });

  describe('SEARCH_LOCATION', () => {
    const action = {
      type: 'SEARCH_LOCATION',
      payload: {
        "data": 
        {
          "city":"Mission Canyon",
          "state":"California",
          "country":"USA",
          "location":
          {
            "type":"Point",
            "coordinates":[-119.71291,34.45083]},
            "current":
            {
              "weather":
              {
                "ts":"2022-03-23T17:00:00.000Z",
                "tp":25,
                "pr":1023,
                "hu":39,
                "ws":2.68,
                "wd":139,
                "ic":"01d"
              },
            "pollution":
            {
              "ts":"2022-03-23T17:00:00.000Z",
              "aqius":19,
              "mainus":"p2",
              "aqicn":6,
              "maincn":"p2"
            }
          }
        }
      }
    
    }
    
    it('should return a different city, stateName, country, temp, airQ, wind', () => {
        const { city, stateName, country, currentTemp, currentAQI, currentWindSpeed } = subject(state, action);
        expect(city).toEqual('Mission Canyon');
        expect(stateName).toEqual('California');
        expect(country).toEqual('USA');
        expect(currentTemp).toEqual(25);
        expect(currentAQI).toEqual(19);
        expect(currentWindSpeed).toEqual(2.68);
    })
  });

});
/*

{"status":"success",
  "data": 
  {
    "city":"Mission Canyon",
    "state":"California",
    "country":"USA",
    "location":
    {
      "type":"Point",
      "coordinates":[-119.71291,34.45083]},
      "current":
      {
        "weather":
        {
          "ts":"2022-03-23T17:00:00.000Z",
          "tp":25,
          "pr":1023,
          "hu":39,
          "ws":2.68,
          "wd":139,
          "ic":"01d"
        },
      "pollution":
      {
        "ts":"2022-03-23T17:00:00.000Z",
        "aqius":19,
        "mainus":"p2",
        "aqicn":6,
        "maincn":"p2"
      }
    }
  }
}

*/
