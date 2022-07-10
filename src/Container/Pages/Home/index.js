import { View, Text, Button } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { log, CONSTANT } from '@Utils';
import { UseLocation, UseAbsen } from '@ViewModel';
import Geolocation from 'react-native-geolocation-service';
import { CameraModal } from '@Organisms';

export default memo(() => {
    const { location, observableLocation, observableDistance, _initFencing, _userFencing } = UseLocation();
    const { _addAbsenMasuk } = UseAbsen();
    const refCameraModal = useRef(<CameraModal />)
    const _toggleCamera = () => refCameraModal.current?.toggle();
    const onAddAbsen = async (file) => {
        try {
            let absenResult = await _addAbsenMasuk(file, location);
            if (absenResult == true) {
                _toggleCamera()
            }
        } catch (err) {
            global.showToast(JSON.stringify(err))
        }
    }
    useEffect(() => {
        log('MOUNT HOME');
        let watchID = null;
        _initFencing().then(() => {
            watchID = Geolocation.watchPosition(_userFencing, null, CONSTANT.GEO_WATCH)
        });
        return () => {
            Geolocation.clearWatch(watchID);
            log('UNMOUNT HOME')
        }
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text>HOME location : {JSON.stringify(location?.coords)}</Text>
            <Text>Titik pusat : </Text>
            <Text>Jarak ke titik pusat : {observableDistance > 1000 ? `${Math.round(observableDistance / 1000)} KM` : `${observableDistance} M`}</Text>

            <Text numberOfLines={6}>{JSON.stringify({
                latitude: observableLocation?.coords?.latitude || 0,
                longitude: observableLocation?.coords?.longitude || 0,
                altitude: observableLocation?.coords?.altitude || 0,
            }, null, 3)}</Text>
            <Button title='camera' onPress={_toggleCamera} disabled={observableDistance < CONSTANT.FENCING_RADIUS ? false : true} />
            <CameraModal ref={refCameraModal} onResult={onAddAbsen} />
        </View>
    )
})