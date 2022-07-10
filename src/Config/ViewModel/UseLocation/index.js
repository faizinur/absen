import React from "react";
import { Linking } from 'react-native'
import { UseLocationModel } from '@Model';
import { log, Fencing, Location, CONSTANT } from '@Utils';
import { reset } from '@RootNavigation';
import Geolocation from 'react-native-geolocation-service';
import { useObservableState } from "observable-hooks";
let watchID = null;
export default () => {
    const { userLocation$, userDistance$ } = UseLocationModel()

    const observableLocation = useObservableState(userLocation$, {})
    const observableDistance = useObservableState(userDistance$, 0)

    const _getLocation = async () => {
        let locationData = await Location();
        userLocation$.next(locationData);
        setTimeout(() => reset('Home'), 1000)
    }

    const _removeFencing = async () => Geolocation.clearWatch(watchID);

    const _starFencing = async () => {
        try {
            Fencing.init(CONSTANT.FENCING_CENTER_POINT, CONSTANT.FENCING_RADIUS);
            watchID = Geolocation.watchPosition(coords => {
                userLocation$.next(coords);
                Fencing.startMonitoring(coords, distance => userDistance$.next(distance));
            }, null, CONSTANT.GEO_WATCH)
        } catch (err) {
            log('_userFencing : ', err);
        }
    }

    const onPressCoords = async ({ latitude, longitude }) => {
        try {
            const URL = `google.navigation:q=${latitude}+${longitude}`;
            const supported = await Linking.openURL(URL);
            if (!supported) throw `not supported`;
            Linking.openURL(supported ? URL : browserURL)
        } catch (err) {
            global.showToast(`ini error linking ${err}`)
        }
    }
    return {
        observableLocation,
        observableDistance,
        _getLocation,
        _removeFencing,
        _starFencing,
        onPressCoords,
    }
}