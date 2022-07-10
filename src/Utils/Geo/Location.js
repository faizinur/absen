import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import { log, CONSTANT } from '@Utils';

const Location = async () => {
    try {
        Geolocation.getCurrentPosition(
            position => Promise.resolve(position.coords),
            error => Promise.reject({ 'accuracy': 0, 'altitude': 0, 'altitudeAccuracy': 0, 'heading': 0, 'latitude': 0, 'longitude': 0, 'speed': 0 }),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        );
    } catch (err) {
        log('location', err)
    }
}

let watchID = null;
const watchPosition = (success, error) => {
    try {
        if (typeof success == 'function') {
            watchID = Geolocation.watchPosition(success, error, CONSTANT.GEO_WATCH)
            log('watch id ', watchID)
        } else {
            log('remove watchId', watchID)
            Geolocation.clearWatch(watchID)
        }
    } catch (er) {
        log('watchPosition', err)
    }
}

export {
    Location,
    watchPosition,
}