import React, { useCallback, useState } from "react";
import { log } from '@Utils'
import RNFS from 'react-native-fs';
import moment from 'moment';
export default () => {
    const _addAbsenMasuk = ({ uri, base64 }, { coords: { latitude, longitude, altitude } }) => {
        try {
            let dataAbsen = {
                nama: 'jhon',
                nip: '098765432',
                jamKerja: {
                    masuk: moment(new Date()).format('MM/DD/YYYY hh:mm:ss'),
                    keluar: ''
                },
                foto: {
                    masuk: 'base64',
                    keluar: ''
                },
                geotaging: {
                    latitude,
                    longitude,
                    altitude,
                },
            }
            RNFS.unlink(uri);
        } catch (err) {
            log('_addAbsen Err', err)
        }
    }
    return {
        _addAbsenMasuk,
    }
}