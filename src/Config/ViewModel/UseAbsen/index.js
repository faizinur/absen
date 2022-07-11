import React, { useCallback, useState } from "react";
import { log } from '@Utils'
import moment from 'moment';
import RNFS from 'react-native-fs';
import { UseLocationModel } from '@Model';
export default () => {
    const { userLocation$ } = UseLocationModel()
    const _addAbsenMasuk = async uri => {
        let base64 = '';
        try {
            base64 = await RNFS.readFile(uri, 'base64');
            let dataAbsen = {
                nama: 'jhon',
                nip: '098765432',
                jamKerja: {
                    masuk: moment(new Date()).format('MM/DD/YYYY hh:mm:ss'),
                    keluar: ''
                },
                foto: {
                    masuk: base64,
                    keluar: ''
                },
                geotaging: {
                    latitude: userLocation$?.value?.coords?.latitude || 0,
                    longitude: userLocation$?.value?.coords?.longitude || 0,
                    altitude: userLocation$?.value?.coords?.altitude || 0,
                },
            }

            return Promise.resolve(true);

            // From image to base64 string di node js

            // let buff = fs.readFileSync('stack-abuse-logo.png');
            // let base64data = buff.toString('base64');
            // From base64 string to image

            // let buff = new Buffer(data, 'base64');
            // fs.writeFileSync('stack-abuse-logo-out.png', buff);
        } catch (err) {
            global.showToast(JSON.stringify(err))
            return Promise.reject(false);
        } finally {
            log(`hapus foto ${uri}`)
            base64 = '';
            RNFS.unlink(uri);

        }
    }
    return {
        _addAbsenMasuk,
    }
}