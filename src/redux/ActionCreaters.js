import * as ActionTypes from "./ActionTypes";

export const loginSuccess = (userData) => ({
    type: ActionTypes.USER_LOGGEDIN,
    payload: userData
});

export const logoutSuccess = () => ({
    type: ActionTypes.USER_LOGGEDOUT
});

export const authLoading = () => ({
    type: ActionTypes.AUTH_LOADING
});