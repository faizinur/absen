import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { log } from '@Utils';
import { UseLocation } from '@ViewModel';
export default ({ navigation: { replace } }) => {
    const { _getLocation, location, observableLocation } = UseLocation();
    useEffect(() => {
        log('MOUNT SPLASH');
        _getLocation()
        _getLocation();
        return () => {
            log('UNMOUNT SPLASH')
        }
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text>SPLASH</Text>
            <Text>: location : {location}</Text>
            <Text>: observableLocation : {observableLocation} </Text>
        </View>
    )
}
