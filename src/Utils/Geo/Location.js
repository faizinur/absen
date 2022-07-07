import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { log } from '@Utils';
let WATCH_ID = null;

const Geo = async () => {
    try {
        const permissionResult = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        const permissionSet = new Set(Object.values(permissionResult));
        if (permissionSet.has('denied') || permissionSet.has('never_ask_again')) {
            log('getCurrentPosition Errors');
            return Promise.resolve(false);
        } else {
            return new Promise((resolve, reject) => {
                if (Platform.OS === 'ios') { Geolocation.requestAuthorization(); }
                Geolocation.getCurrentPosition(
                    position => resolve(position.coords),
                    error => {
                        log('getCurrentPosition Error', error);
                        alert('Tidak dapat menentukan lokasi.');
                        resolve({ 'accuracy': 0, 'altitude': 0, 'altitudeAccuracy': 0, 'heading': 0, 'latitude': 0, 'longitude': 0, 'speed': 0 });
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
                );
            });
        }
    } catch (err) {
        log(err);
    }
};


const watchPosition = (success, error) => {
    try {
        WATCH_ID = Geolocation.watchPosition(success, error,
            {
                enableHighAccuracy: true,
                forceRequestLocation: true,
            })
    } catch (err) {
        log('watchPosition ', err)
    }
}

const clearWatch = () => {
    Geolocation.clearWatch(WATCH_ID);
    // Geolocation.stopObserving();
}
export {
    watchPosition,
    clearWatch,
}
export default Geo;
