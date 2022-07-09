import React, { createContext, useContext } from 'react';
import { BehaviorSubject } from 'rxjs';

const userLocation$ = new BehaviorSubject();
const userDistance$ = new BehaviorSubject();

const AppContenxt = createContext({
    userLocation$,
    userDistance$,
})

export const UseUserLocation = () => useContext(AppContenxt);

export const AppContenxtProvider = ({ children }) => (
    <AppContenxt.Provider value={{ userLocation$, userDistance$ }}>
        {children}
    </AppContenxt.Provider>
) 