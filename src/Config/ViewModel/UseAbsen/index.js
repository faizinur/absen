import React, { useCallback, useState } from "react";
import { log } from '@Utils'
import moment from 'moment';
export default () => {
    const _addAbsenMasuk = ({ base64 }, { coords: { latitude, longitude, altitude } }) => {
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

            global.showToast(JSON.stringify(dataAbsen))

            return Promise.resolve(true);

            // From image to base64 string di node js

            // let buff = fs.readFileSync('stack-abuse-logo.png');
            // let base64data = buff.toString('base64');
            // From base64 string to image

            // let buff = new Buffer(data, 'base64');
            // fs.writeFileSync('stack-abuse-logo-out.png', buff);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    return {
        _addAbsenMasuk,
    }
}