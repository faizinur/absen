/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, memo } from 'react';
import {
	Text,
	View,
	StatusBar,
} from 'react-native';
import { log } from '@Utils';
import { UseLocation } from '@ViewModel';
import MainStackNavigator from './src/Container/Pages/index';
import Toast from "react-native-toast-notifications";
let TOAST_ID = null;


export default memo((props) => {
	const { mocked, _appMount } = UseLocation()
	const refToast = useRef(<Toast />);
	global.showToast = (message = 'Simple Toast', duration = 1500, type = 'normal', placement = 'bottom') => {
		if (TOAST_ID != null) {
			refToast.current.update(TOAST_ID, message, { type: 'warning', duration: duration + 3000 })
			TOAST_ID = null;
			return false;
		}
		TOAST_ID = refToast.current.show(message, {
			type,//"normal | success | warning | danger | custom",
			placement,//"top | bottom",
			duration,
			offset: 30,
			animationType: 'slide-in',//"slide-in | zoom-in",
		});
		setTimeout(() => TOAST_ID = null, duration)
	}
	useEffect(() => {
		log('MOUNT APP')
		_appMount()
		return () => {
			log('UNMOUNT APP')
		}
	}, [])
	return (
		// mocked == false ?
		<View style={{ flex: 1 }}>
			<StatusBar
				animated={true}
				backgroundColor={'transparent'}
				barStyle={'dark-content'}
				showHideTransition={'fade'}
				hidden={false} />
			<MainStackNavigator />
			<Toast ref={refToast} />
		</View>
		// :
		// <View>
		// 	<Text>DIHARAP TIDAK MENCURANGI SISTEM</Text>
		// </View>
	);
});