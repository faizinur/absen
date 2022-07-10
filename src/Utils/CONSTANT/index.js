const GEO_WATCH = {
    accuracy: 'high',
    enableHighAccuracy: true,
    distanceFilter: .5,
    interval: 500,
    fastestInterval: 1000,
    forceRequestLocation: true,
}

let FENCING_CENTER_POINT = {
    latitude: -7.7235839,
    longitude: 108.4497807,
}
const FENCING_RADIUS = 5;

export {
    FENCING_CENTER_POINT,
    FENCING_RADIUS,
    GEO_WATCH,
}