import { actionTypes } from "../components/PlacesTable" 
import { places as initial } from "../places";

export const getLocations = async (dispatch) => {
    try {
      //api
      dispatch({type: actionTypes.SET_PLACES, payload: initial });
    } catch (error) {
      throw error;
    }
};

export const addLocation = async (newLocation , dispatch) => {
    try {
        //api
        dispatch({ type: actionTypes.ADD_PLACE, payload: newLocation});
    } catch (error) {
        throw error;
    }
}

export const updateLocation = async(updateLocation, dispatch) => {
    try {
        //api
        dispatch({ type: actionTypes.UPDATE_PLACE, payload: updateLocation});
    } catch (error) {
        throw error;
    }
}

export const delLocation = async (delLocationId , dispatch) => {
    try {
        //api
        dispatch({ type: actionTypes.DELETE_PLACE, payload: delLocationId});
    } catch (error) {
        throw error;
    }
}