import { View, Text, Button } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { log, CONSTANT } from '@Utils';
import { UseLocation, UseAbsen } from '@ViewModel';
import { CameraModal } from '@Organisms';

export default memo(() => {
    const { observableLocation, observableDistance, _startFencing, _removeFencing, onPressCoords } = UseLocation();
    const { _addAbsenMasuk } = UseAbsen();
    const refCameraModal = useRef(<CameraModal />)
    const _toggleCamera = () => refCameraModal.current?.toggle();
    const onAddAbsen = async (file) => {
        try {
            let absenResult = await _addAbsenMasuk(file, location);
            if (absenResult == false) throw `absen error nih!.`
            _toggleCamera()
        } catch (err) {
            global.showToast(JSON.stringify(err))
        }
    }
    useEffect(() => {
        log('MOUNT HOME');
        _startFencing();
        return () => {
            log('UNMOUNT HOME')
            _removeFencing();
        }
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            {observableLocation?.mocked == true && <Text>MOHON TIDAK MENCURANGI SISTEM</Text> ||
                <View>
                    <Text>HOME</Text>
                    <Text onPress={() => onPressCoords(CONSTANT.FENCING_CENTER_POINT)}>Titik pusat : {JSON.stringify(CONSTANT.FENCING_CENTER_POINT)}</Text>
                    <Text>Jarak ke titik pusat : {observableDistance > 1000 ? `${Math.round(observableDistance / 1000)} KM` : `${observableDistance} M`}</Text>

                    <Text
                        onPress={() => onPressCoords(observableLocation?.coords)}
                        numberOfLines={6}>
                        {JSON.stringify({
                            latitude: observableLocation?.coords?.latitude || 0,
                            longitude: observableLocation?.coords?.longitude || 0,
                            altitude: observableLocation?.coords?.altitude || 0,
                        }, null, 3)}</Text>
                    <Button title='camera' onPress={_toggleCamera} disabled={observableDistance < CONSTANT.FENCING_RADIUS ? false : true} />
                </View>
            }
            <CameraModal ref={refCameraModal} onResult={onAddAbsen} />
        </View>
    )
})