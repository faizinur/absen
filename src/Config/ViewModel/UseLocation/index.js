import React, { useState } from "react";
import { log, Fencing } from '@Utils'
import { PermissionsAndroid } from 'react-native';
import RNMockLocationDetector from "react-native-mock-location-detector";

export default () => {
    const [mocked, setMocked] = useState(false);
    const _appMount = async () => {
        try {
            log('_onMount : ')
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                { title: 'ABSEN GURU APP', message: 'AKSES lOKASI DIBUTUHKAN' }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const isLocationMocked = await RNMockLocationDetector.checkMockLocationProvider();
                setMocked(isLocationMocked)
            }
        } catch (er) {
            log('err : ', err)
        }
    }

    const _homeMount = async () => {
        try {
            const latitude = -6.9125533;
            const longitude = 107.6294967;
            Fencing.init(latitude, longitude)
            Fencing.startMonitoring();
        } catch (err) {
            log('_homeMount : ', err);
        }
    }

    const _homeUnmount = () => Fencing.stopMonitoring()

    return {
        mocked,
        _appMount,
        _homeMount,
        _homeUnmount,
    }
}