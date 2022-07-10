import React, { useCallback, useEffect, useState } from "react";
import { UseLocationModel } from '@Model';
import { log, Fencing, Location, CONSTANT } from '@Utils';
import { reset } from '@RootNavigation';
import { useObservableState } from "observable-hooks";
export default () => {
    const [location, setLocation] = useState({});
    const { userLocation$, userDistance$ } = UseLocationModel()

    // kalau cara ini berhasil coba pindah import ke model dan useObservableState ke model, lalu albil dari  UseLocationModel
    const observableLocation = useObservableState(userLocation$, {}) //state observable
    const observableDistance = useObservableState(userDistance$, 0) //state observable


    const _getLocation = async () => {
        let locationData = await Location();
        userLocation$.next(locationData);
        setTimeout(() => reset('Home'), 1000)
    }

    const _initFencing = async () => {
        Fencing.init(CONSTANT.FENCING_CENTER_POINT, CONSTANT.FENCING_RADIUS);
    }

    const _userFencing = async userLocation => {
        try {
            userLocation$.next(userLocation);
            Fencing.startMonitoring(userLocation, distance => userDistance$.next(distance));
        } catch (err) {
            log('_userFencing : ', err);
        }
    }

    useEffect(() => {
        const locationSubs = userLocation$.subscribe(setLocation) //cek perubahan cukup di subscribe atau tidak
        return () => {
            locationSubs.unsubscribe()
        }
    }, []);
    return {
        observableLocation,
        observableDistance,
        location,
        _getLocation,
        _initFencing,
        _userFencing,
    }
}