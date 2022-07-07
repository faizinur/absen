import React, { useCallback, useState } from "react";
import { log, Fencing, CONSTANT } from '@Utils'
import { PermissionsAndroid } from 'react-native';
import RNMockLocationDetector from "react-native-mock-location-detector";

export default () => {
    const [mocked, setMocked] = useState(false);
    const [location, setLocation] = useState({});
    const [distance, setDistance] = useState(0);

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

    const _initFencing = () => {
        const latitude = -6.9125895;
        const longitude = 107.6294408;
        Fencing.init(latitude, longitude, CONSTANT.FENCING_RADIUS);
    }

    const _userFencing = useCallback(async userLocation => {
        try {
            setLocation(userLocation);
            Fencing.startMonitoring(userLocation, setDistance);
        } catch (err) {
            log('_homeMount : ', err);
        }
    }, [location, distance])

    return {
        mocked,
        location,
        distance,
        setLocation,
        _appMount,
        _initFencing,
        _userFencing,
    }
}