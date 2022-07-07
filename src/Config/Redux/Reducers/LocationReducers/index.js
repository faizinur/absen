import { SET_DISTANCE, SET_LOCATION } from '../../types';
const initialState = {
    distance: 0,
    coords: {
        longitude: 0,
        latitude: 0,
        altitude: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LOCATION:
            return {
                ...state,
                coords: payload
            };
        case SET_DISTANCE:
            return {
                ...state,
                distance: payload
            };
        default: return state;
    }
};