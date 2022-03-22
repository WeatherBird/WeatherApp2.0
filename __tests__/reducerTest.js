import * as React from 'react';
//import '@testing-library/jest-dom';  //recommended but not needed
import {render, fireEvent, screen} from '@testing-library/react' 

import subject from '../client/reducers/dashboardsReducer';

describe('Dashboard Reducer', () => {

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

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      
    })
  });





});