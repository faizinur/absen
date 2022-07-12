import React, { createContext, useContext } from 'react';
import { BehaviorSubject } from 'rxjs';

const userLocation$ = new BehaviorSubject({});
const userDistance$ = new BehaviorSubject(0);


const AppContenxt = createContext({
    userLocation$,
    userDistance$,
})

export const UseLocationModel = () => useContext(AppContenxt);

export const AppContenxtProvider = ({ children }) => (
    <AppContenxt.Provider value={{ userLocation$, userDistance$ }}>
        {children}
    </AppContenxt.Provider>
) 