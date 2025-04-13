import { actionTypes } from '../components/accessibilityFeatures.table';
import { accessibilityFeaturesData as initial } from '../components/accessibilityFeatures.data';

export const getAccessibilityFeatures = async (dispatch) => {
    try {
      //api
      dispatch({type: actionTypes.SET_PLACES, payload: initial });
    } catch (error) {
      throw error;
    }
};

export const addAccessibilityFeatures = async (newAccessibilityFeatures , dispatch) => {
    try {
        //api
        dispatch({ type: actionTypes.ADD_PLACE, payload: newAccessibilityFeatures});
    } catch (error) {
        throw error;
    }
}

export const updateAccessibilityFeatures = async(updateAccessibilityFeatures, dispatch) => {
    try {
        //api
        dispatch({ type: actionTypes.UPDATE_PLACE, payload: updateAccessibilityFeatures});
    } catch (error) {
        throw error;
    }
}

export const delAccessibilityFeatures = async (delAccessibilityFeatures , dispatch) => {
    try {
        //api
        dispatch({ type: actionTypes.DELETE_PLACE, payload: delAccessibilityFeatures});
    } catch (error) { 
        throw error;
    }
}