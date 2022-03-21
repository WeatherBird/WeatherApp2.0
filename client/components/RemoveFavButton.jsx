import React from 'react';
import {connect} from 'redux';

// we also need to make sure that if we get a 200: OK response for deleting a favorite place from the server
// that we go ahead and remove from the state.favorites array the city with the corresponding id 
// so that the redux state manager knows to repaint a page without that favorite city info card
const mapDispatchToProps = dispatch => ({
    // create functions that will dispatch action creators
    dispatchDeleteFavorite: (locationId) => {
      dispatch(actions.deleteFavorite(locationId));
    }
});


const RemoveFavButton = (props) => {
  // props.removeId <- this holds the id to remove
  // props.userId <- this holds the current user's id
  removeObj = {userId: props.userId, favoritesId: props.removeId};
  const removeFavorite = (event) => {
    fetch('/server', {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(removeObj)
    })
    .then(data => {
      // check status of response
      if (response.status == 200) {
        // remove the city from the favorites array in the state
        //add dispatch here
        this.props.dispatchDeleteFavorite(data.favorites_id);
      }
    })
  }

  return (
    <button onClick={removeFavorite}>Remove from Favorites</button>
  )
}

export default connect(null, mapDispatchToProps)(RemoveFavButton);