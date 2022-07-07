import { View, Text, Button } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { log, CONSTANT } from '@Utils';
import { UseLocation, UseAbsen } from '@ViewModel';
import Geolocation from 'react-native-geolocation-service';
import { CameraModal } from '@Organisms';

export default memo(() => {
    const { location, distance, _initFencing, _userFencing } = UseLocation();
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
            <Text>HOME {distance}</Text>
            <Text numberOfLines={6}>{JSON.stringify({
                latitude: location?.coords?.latitude || 0,
                longitude: location?.coords?.longitude || 0,
                altitude: location?.coords?.altitude || 0,
            }, null, 3)}</Text>
            <Button title='camera' onPress={_toggleCamera} disabled={distance < CONSTANT.FENCING_RADIUS ? false : true} />
            <CameraModal ref={refCameraModal} onResult={onAddAbsen} />
        </View>
    )
})