import React from "react";
import { UseLocationModel } from '@Model';
import { log, Fencing, Location, watchPosition, CONSTANT } from '@Utils';
import { reset } from '@RootNavigation';
import { useObservableState } from "observable-hooks";
import { combineLatest, map, pipe, tap } from "rxjs";

export default () => {
    const { userLocation$, userDistance$ } = UseLocationModel()

    const observableLocation = useObservableState(userLocation$, {})
    const observableDistance = useObservableState(userDistance$, 0)

    const _getLocation = async () => {
        let coords = await Location();
        userLocation$.next(coords);
        setTimeout(() => reset('Home'), 1000)
    }

    const _removeFencing = async () => watchPosition(false)

    const _startFencing = async () => {
        try {
            Fencing.init(CONSTANT.FENCING_CENTER_POINT, CONSTANT.FENCING_RADIUS);
            watchPosition(coords => {
                userLocation$.next(coords);
                Fencing.startMonitoring(coords, distance => userDistance$.next(distance));
            }, null, CONSTANT.GEO_WATCH)
        } catch (err) {
            log('_userFencing : ', err);
        }
    }

    const _updateDeirection = async ({ heading, zoom }) => {

        userLocation$.pipe(
            map(userLocation => ({
                ...userLocation,
                ...{
                    coords: {
                        ...userLocation.coords,
                        heading
                    }
                }
            })),
            tap(userLocation => log(userLocation))
        )
    }

    const elemState = () => observableDistance < CONSTANT.FENCING_RADIUS ? false : true

    return {
        observableLocation,
        observableDistance,
        _getLocation,
        _updateDeirection,
        _removeFencing,
        _startFencing,
        elemState,
    }
}