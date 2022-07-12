import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { log, CONSTANT } from '@Utils';
import { UseLocation, UseAbsen } from '@ViewModel';
import { CameraModal } from '@Organisms';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default memo(() => {

    const { observableLocation, observableDistance, _startFencing, _removeFencing, _updateDeirection, elemState } = UseLocation();
    const { _addAbsenMasuk } = UseAbsen();

    const refCameraModal = useRef(<CameraModal />)
    const refMapView = useRef(<MapView />)

    const _toggleCamera = () => refCameraModal.current?.toggle();
    const onAddAbsen = async (file) => {
        let absenResult = await _addAbsenMasuk(file);
        if (!absenResult) throw `absen error nih!.`
        _toggleCamera()
    }
    const _onMapReady = () => {
        refMapView.current.fitToCoordinates([{ ...CONSTANT.FENCING_CENTER_POINT }, {
            latitude: observableLocation?.coords?.latitude || 0,
            longitude: observableLocation?.coords?.longitude || 0
        }], { animated: true })
    }

    const updateCameraHeading = async () => {
        try {
            let { heading, zoom } = await refMapView?.current?.getCamera();
            _updateDeirection({ heading, zoom })
        } catch (err) {
            log('updateCameraHeading : ', err)
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
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

            <MapView
                ref={refMapView}
                showsCompass={true}
                showsTraffic={false}
                showsMyLocationButton={false}
                showsIndoorLevelPicker={false}
                showsBuildings={false}
                showsPointsOfInterest={false}
                showsScale={false}
                userInterfaceStyle={'light'}
                followsUserLocation
                onMapReady={_onMapReady}
                style={{ ...StyleSheet.absoluteFill }}
                provider={PROVIDER_GOOGLE}
                region={{
                    ...CONSTANT.FENCING_CENTER_POINT,
                    latitudeDelta: CONSTANT.FENCING_RADIUS * 0.0001,
                    longitudeDelta: CONSTANT.FENCING_RADIUS * 0.0001,
                }}
                onTouchEnd={updateCameraHeading}
                onTouchCancel={updateCameraHeading}
                onTouchStart={updateCameraHeading}
                onTouchMove={updateCameraHeading}>
                <Circle
                    strokeWidth={1}
                    strokeColor={'rgb(0,0,255)'}
                    fillColor={'rgba(0,0,255,.05)'}
                    center={{ ...CONSTANT.FENCING_CENTER_POINT }}
                    radius={CONSTANT.FENCING_RADIUS}
                />
                <Marker
                    coordinate={{
                        latitude: observableLocation?.coords?.latitude || 0,
                        longitude: observableLocation?.coords?.longitude || 0
                    }}>
                    <Icon name="face-man" size={30} style={{ transform: [{ rotate: `${observableLocation?.coords?.heading || 0}deg` }] }} />
                </Marker>
            </MapView>
            <View style={{ backgroundColor: 'white', width: '100%', height: 100, padding: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ width: '100%', fontWeight: '600', fontSize: 16 }} numberOfLines={1} ellipsizeMode={'tail'}>Fulan bin Fulan</Text>
                    <Text style={{ width: '100%' }} numberOfLines={1} ellipsizeMode={'tail'}>Titik pusat : {CONSTANT.FENCING_CENTER_POINT.latitude} , {CONSTANT.FENCING_CENTER_POINT.longitude}</Text>
                    <Text style={{ width: '100%' }} numberOfLines={1} ellipsizeMode={'tail'}>Jarak ke titik pusat : {observableDistance > 1000 ? `${Math.round(parseInt(observableDistance) / 1000 / 100)} KM` : `${Math.round(observableDistance)} M`}</Text>
                </View>


                <TouchableOpacity
                    style={{ height: 80, width: '18%', borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: elemState && 'coral' || 'skyblue' }}
                    onPress={elemState && _toggleCamera}
                    disabled={elemState}>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: 'white' }}>absen</Text>
                </TouchableOpacity>
            </View>
            <CameraModal ref={refCameraModal} onResult={onAddAbsen} />
        </View >
    )
})