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
        city: 'St. Louis', 
        stateName: 'Missouri', 
        country: 'USA',
        currentTemp: '75deg F', 
        currentAQI: '20', 
        currentWindSpeed: '2mph',
      }
    
    }
    
    it('should return a different city, stateName, country, temp, airQ, wind', () => {
        const { city, stateName, country, currentTemp, currentAQI, currentWindSpeed } = subject(state, action);
        expect(city).toEqual('St. Louis');
        expect(stateName).toEqual('Missouri');
        expect(country).toEqual('USA');
        expect(currentTemp).toEqual('75deg F');
        expect(currentAQI).toEqual('20');
        expect(currentWindSpeed).toEqual('2mph');
    })
  });

});
