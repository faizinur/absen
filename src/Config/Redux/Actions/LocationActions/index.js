import { SET_DISTANCE, SET_LOCATION } from '../../types'

const setDistance = payload => ({
    type: SET_DISTANCE,
    payload,
})

const setLocation = payload => ({
    type: SET_LOCATION,
    payload,
})

export {
    setDistance,
    setLocation
}