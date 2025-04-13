import { actionTypes } from '../components/LocationTable';
import { places as initial } from '../places';

export const getLocationsWithDispatch = async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SET_LOCATIONS, payload: initial });
  } catch (error) {
    throw error;
  }
};

export const delLocationWithDispatch = async (delLocationId, dispatch) => {
  try {
    // api вызов для удаления
    dispatch({ type: actionTypes.DELETE_LOCATION, payload: delLocationId });
  } catch (error) {
    throw error;
  }
};

export const addLocation = async (newLocation) => {
  try {
    // api вызов для добавления
  } catch (error) {
    throw error;
  }
};

export const updateLocation = async (updateLocation) => {
  try {
    // api вызов для обновления
  } catch (error) {
    throw error;
  }
};
