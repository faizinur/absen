import * as React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';
import { log } from '@Utils';

const navigationRef = React.createRef();
const navigate = (name, params = {}) => {
    navigationRef.current?.navigate(name, params);
}
const replace = (name, params = {}) => {
    log(navigationRef.current)
    // navigationRef.current?.replace(name, params);
}
const reset = (name, params = {}) => {
    // log(name)
    navigationRef.current?.dispatch(
        // Remove the home route from the stack
        CommonActions.reset({
            index: 0,
            routes: [
                { name: name },
            ],
        })
    )
}
const getCurrentRoute = () => {
    return navigationRef.current?.getCurrentRoute()
}
const back = () => {
    if (navigationRef.current?.canGoBack() == false) {
        return false;
    } else {
        return navigationRef.current?.goBack()
    }
}

export {
    navigationRef,
    navigate,
    replace,
    reset,
    getCurrentRoute,
    back,
}