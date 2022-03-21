import * as types from '../constants/actionTypes';

export const addFavorite = newLocation => ({
  type: types.ADD_FAVORITE,
  payload: newLocation,
});
  
export const addFriend = friendId => ({
  type: types.ADD_FRIEND,
  payload: friendId,
});

export const searchForLocation = weatherData => ({
  type: types.SEARCH_LOCATION,
  payload: weatherData
})