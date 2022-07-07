import React, { useCallback, useState } from "react";
import { log, Fencing, Location, CONSTANT } from '@Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setDistance, setLocation } from '@Redux';
export default () => {
    const dispatch = useDispatch();
    const location = useSelector(({ userCoords: { coords } }) => coords)
    const distance = useSelector(({ userCoords: { distance } }) => distance)

    const _getLocation = async () => {
        let data = await Location();
        dispatch(setLocation(data));
    }

    const _initFencing = async () => {
        const latitude = -6.925591;
        const longitude = 107.609926;
        Fencing.init(latitude, longitude, CONSTANT.FENCING_RADIUS);
    }

    const _userFencing = async userLocation => {
        try {
            dispatch(setLocation(userLocation));
            Fencing.startMonitoring(userLocation, distance => dispatch(setDistance(distance)));
        } catch (err) {
            log('_userFencing : ', err);
        }
    }

    return {
        location,
        distance,
        _getLocation,
        _initFencing,
        _userFencing,
    }
}