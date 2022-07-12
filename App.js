/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, memo } from 'react';
import {
	View,
	StatusBar,
} from 'react-native';
import { log } from '@Utils';
import MainStackNavigator from './src/Container/Pages/index';
import { MyToast } from '@Atoms';
import { enableLatestRenderer } from 'react-native-maps';
enableLatestRenderer();
import { AppContextProvider } from '@Model';
export default memo(() => {
	useEffect(() => {
		log('MOUNT APP')
		return () => {
			log('UNMOUNT APP')
		}
	}, [])
	return (
		<AppContextProvider>
			<View style={{ flex: 1 }}>
				<StatusBar
					animated={true}
					backgroundColor={'transparent'}
					barStyle={'dark-content'}
					showHideTransition={'fade'}
					hidden={false} />
				<MainStackNavigator />
				<MyToast />
			</View>
		</AppContextProvider>
	);
});