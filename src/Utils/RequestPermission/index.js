import React from 'react';
import { PermissionsAndroid } from 'react-native'
export default async () => {
    try {
        const permissionResult = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,]
        )
        const permissionSet = new Set(Object.values(permissionResult));
        if (permissionSet.has('denied') || permissionSet.has('never_ask_again')) {
            throw 'request failed Please Go into Settings -> Applications -> absenguru -> Permissions and Allow permissions to continue'
        }
        return Promise.resolve(true);
    } catch (err) {
        return Promise.reject(err)
    }
}