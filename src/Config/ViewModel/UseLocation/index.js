import React, { useCallback, useState } from "react";
import { UseUserLocation } from '@Model';
import { log, Fencing, Location, CONSTANT } from '@Utils';
import { reset } from '@RootNavigation';
export default () => {
    const { userLocation$, userDistance$ } = UseUserLocation()

    const _getLocation = async () => {
        let locationData = await Location();
        userLocation$.next(locationData);
        setTimeout(() => reset('Home'), 1000)
    }

    const _initFencing = async () => {
        const latitude = -6.925591;
        const longitude = 107.609926;
        Fencing.init(latitude, longitude, CONSTANT.FENCING_RADIUS);
    }

    const _userFencing = async userLocation => {
        try {
            userLocation$.next(userLocation);
            Fencing.startMonitoring(userLocation, distance => userDistance$.next(distance));
        } catch (err) {
            log('_userFencing : ', err);
        }
    }

    return {
        userLocation$,
        _getLocation,
        _initFencing,
        _userFencing,
    }
}