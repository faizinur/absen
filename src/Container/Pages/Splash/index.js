import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { log } from '@Utils';

export default ({ navigation: { replace } }) => {
    useEffect(() => {
        log('MOUNT SPLASH');
        setTimeout(() => replace('Home'), 2000)
        return () => {
            log('UNMOUNT SPLASH')
        }
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text>SPLASH</Text>
        </View>
    )
}
