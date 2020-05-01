import * as ActionTypes from '../ActionTypes';

export const authStore = (state = {loggedIn: false, userData: [], isLoading:false }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, loggedIn:true, userData: action.payload, isLoading: false};
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state, loggedIn: false, userData: [], isLoading: false};
        case ActionTypes.AUTH_LOADING: 
            return {...state, isLoading: true}
        default:
            return state;
    }
}