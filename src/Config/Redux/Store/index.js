import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
    LocationReducers as userCoords,
} from '../Reducers';


export default () => createStore(
    combineReducers({ userCoords }),
    applyMiddleware(thunk)
);