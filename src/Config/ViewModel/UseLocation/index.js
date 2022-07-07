import React, { useCallback, useState } from "react";
import { log, Fencing, Location, CONSTANT } from '@Utils'
export default () => {
    const [location, setLocation] = useState({});
    const [distance, setDistance] = useState(0);

    const _initFencing = useCallback(async () => {
        let loc = await Location();
        setLocation(loc);
        const latitude = -6.9125895;
        const longitude = 107.6294408;
        Fencing.init(latitude, longitude, CONSTANT.FENCING_RADIUS);
    }, [location])

    const _userFencing = useCallback(async userLocation => {
        try {
            setLocation(userLocation);
            Fencing.startMonitoring(userLocation, setDistance);
        } catch (err) {
            log('_homeMount : ', err);
        }
    }, [location, distance])

    return {
        location,
        distance,
        _initFencing,
        _userFencing,
    }
}