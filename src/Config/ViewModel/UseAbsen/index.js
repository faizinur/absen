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
            // From image to base64 string

            // let buff = fs.readFileSync('stack-abuse-logo.png');
            // let base64data = buff.toString('base64');
            // From base64 string to image

            // let buff = new Buffer(data, 'base64');
            // fs.writeFileSync('stack-abuse-logo-out.png', buff);
        } catch (err) {
            log('_addAbsen Err', err)
        }
    }
    return {
        _addAbsenMasuk,
    }
}