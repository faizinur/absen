import { View, Text } from 'react-native'
import React, { memo, useEffect } from 'react'
import { log } from '@Utils';

import { UseLocation } from '@ViewModel';
export default memo(({ navigation: { replace } }) => {
    const { _homeMount, _homeUnmount } = UseLocation()
    useEffect(() => {
        log('MOUNT HOME');
        _homeMount()
        return () => {
            log('UNMOUNT HOME')
            _homeUnmount()
        }
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text>HOME</Text>
        </View>
    )
})
