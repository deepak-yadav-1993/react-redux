import * as ActionTypes from '../ActionTypes';

export const authStore = (state = {loggedIn: false, userData: {}, isLoading:false }, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOGGEDIN:
            return {...state, loggedIn:true, userData: action.payload, isLoading: false};
        case ActionTypes.USER_LOGGEDOUT:
            return {...state, loggedIn: false, userData: {}, isLoading: false};
        case ActionTypes.AUTH_LOADING: 
            return {...state, isLoading: true}
        default:
            return state;
    }
}