import React from 'react';
import '../styles/CurrentWeather.css';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'

// const mapDispatchToProps = dispatch => ({
//     // create functions that will dispatch action creators
//     dispatchAddFavorite: (location) => {
//       dispatch(actions.addFavorite(location));
//     }
// });

const mapStateToProps = state => { 
    //redux state
    console.log('state: ', state)
    return {
    // add pertinent state here
    userId: state.main.userId,
    nickname: state.main.nickname,
    city: state.main.city, 
    stateName: state.main.stateName, 
    country: state.main.country,
    currentTemp: state.main.currentTemp, 
    currentAQI: state.main.currentAQI, 
    currentWindSpeed: state.main.currentWindSpeed,
    favorites: [...state.main.favorites]
    }
};

const mapDispatchToProps = dispatch => ({
    // create functions that will dispatch action creators
    dispatchApiAppendFavs: (dispatchData) => {
      dispatch(actions.apiAppendFavs(dispatchData));
    }
});
/**
 * 
 * {currentTemp={data.current.weather.tp} currentAQI={data.current.pollution.aqius} currentWindSpeed={data.current.weather.ws}} props 
 * 
 */
const FavWeather = (props) => {
    // const favPlaceIndex = props.favPlaceIndex;
    // console.log('favPlaceIndex: ', favPlaceIndex);
    let badPollution = false;
    // console.log('props.favorites: ', props.favorites);
    // const currentFavoritePlace = props.favorites[favPlaceIndex];
    // console.log('currentFavoritePlace: ', currentFavoritePlace);
    if (props.currentAQI > 50) {
        badPollution = true;
    }


    const favoritePlace = props.favoritePlace; // <- current favorite {city: '' , state: ''}
    ///(
    if (!props.favorites[props.favPlaceIndex].currentTemp){
        fetch(`http://api.airvisual.com/v2/city?city=${favoritePlace.city}&state=${favoritePlace.state}&country=${favoritePlace.country}&key=2e5b896a-c496-4143-b954-2a9c38616e29`)
        .then(data => data.json())
        .then((data) => {
            console.log('data: ', data);
            // we need to update state with API fetch results here
            // let badPollution = false;

            const dispatchData = {
            temp: data.data.current.weather.tp,
            aqi: data.data.current.pollution.aqius,
            wind: data.data.current.weather.ws,
            index: props.favPlaceIndex
            };

            // if (dispatchData.aqi > 50) {
            //     dispatchData.pollution = true;
            // }
        


            props.dispatchApiAppendFavs(dispatchData);

            console.log('DISPATCH DATA: ', dispatchData);
            // let badPollution = false;

            // if (dispatchData.aqi > 50) {
            //     badPollution = true;
            // }

            //pass dispacth data to userFavorites
            // use index to figure out which element of favorites[] to update with weather
            // this.props.dispatchUpdateFavorites()
        })
        .catch(error => console.log('error with api fetch (favorites): ', error));
    }
    console.log('WE ARE LOOKING FOR PROPS:', props.favorites[props.favPlaceIndex].currentTemp);
    return (
        // !props.favorites[props.favPlaceIndex].currentTemp ? null : 
        <div id='currentweather'>
            <ol>
                <li className="weatherlist city">{`${favoritePlace.city}`} </li> 
                <li className="weatherlist city">{`${favoritePlace.state}, ${favoritePlace.country}`} </li> 
                {/* <li className="weatherlist city">State: {`${favoritePlace.state}`} </li>  */}
                <li className="weatherlist">Temperature: {`${(props.favorites[props.favPlaceIndex].currentTemp * 9/5) + 32} °F`} </li>
                <li className="weatherlist">Air Quality Index: {props.favorites[props.favPlaceIndex].currentAQI}</li> 
                <li className="weatherlist">Wind Speed: {`${props.favorites[props.favPlaceIndex].currentWindSpeed} m/s`}</li>
                <li className="weatherlist">Mask needed?{badPollution ? ' Yes  😢  😢  😢' : ' No 🥳  🥳  🥳'} </li>
                <li className="weatherlist">Stay at Home?{badPollution ? ' Recommended to stay indoor ' : ' Go outside and enjoy the sun!!'} </li>
            </ol>

        </div>
    )
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FavWeather);