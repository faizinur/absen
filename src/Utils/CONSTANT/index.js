const GEO_WATCH = {
    accuracy: 'high',
    enableHighAccuracy: true,
    distanceFilter: .5,
    interval: 500,
    fastestInterval: 1000,
    forceRequestLocation: true,
}

let FENCING_CENTER_POINT = {
    latitude: -7.721389,
    longitude: 108.449869,
}
const FENCING_RADIUS = 15;

export {
    FENCING_CENTER_POINT,
    FENCING_RADIUS,
    GEO_WATCH,
}