import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import { log, CONSTANT } from '@Utils';

const location = async () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => {
            log('getCurrentPosition Error', error);
            alert('Tidak dapat menentukan lokasi.');
            reject({ 'accuracy': 0, 'altitude': 0, 'altitudeAccuracy': 0, 'heading': 0, 'latitude': 0, 'longitude': 0, 'speed': 0 });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    );
});

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

    }
}

export {
    location,
    watchPosition,
}