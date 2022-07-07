import 'react-native-gesture-handler';
/**
 * @format
 */
import { LogBox } from "react-native";
if (__DEV__) {
    const ignoreWarns = [
        "EventEmitter.removeListener",
        "[fuego-swr-keys-from-collection-path]",
        "Setting a timer for a long period of time",
        "ViewPropTypes will be removed from React Native",
        "AsyncStorage has been extracted from react-native",
        "exported from 'deprecated-react-native-prop-types'.",
        "Non-serializable values were found in the navigation state.",
        "VirtualizedLists should never be nested inside plain ScrollViews",
    ];

    const warn = console.warn;
    console.warn = (...arg) => {
        for (const warning of ignoreWarns) {
            if (arg[0].startsWith(warning)) {
                return;
            }
        }
        warn(...arg);
    };

    LogBox.ignoreLogs(ignoreWarns);
}
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { ConfigureStore } from '@Redux';
import { name as appName } from './app.json';

const store = ConfigureStore();

const AppProvider = () => (
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
)


AppRegistry.registerComponent(appName, () => AppProvider);
