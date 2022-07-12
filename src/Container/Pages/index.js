
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@RootNavigation';

import Splash from './Splash';
import Login from "./Login";
import Home from "./Home";
import RxTest from './RxTest'

const Stack = createNativeStackNavigator();
const animationSlide = { headerMode: 'none', headerShown: false }

export default stackProps => (
    <NavigationContainer
        ref={navigationRef}>
        <Stack.Navigator
            initialRouteName={"RxTest"}
            mode={"card"}
            ScreenOptions={{}}>
            <Stack.Screen name="Splash" options={() => (animationSlide)}>
                {props => <Splash  {...props} {...stackProps} />}
            </Stack.Screen>
            <Stack.Screen name="Login" options={() => (animationSlide)}>
                {props => <Login  {...props} {...stackProps} />}
            </Stack.Screen>
            <Stack.Screen name="Home" options={() => (animationSlide)}>
                {props => <Home  {...props} {...stackProps} />}
            </Stack.Screen>
            <Stack.Screen name="RxTest" options={() => (animationSlide)}>
                {props => <RxTest  {...props} {...stackProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
);
export {
    Splash,
    Login,
    Home,
    RxTest,
}