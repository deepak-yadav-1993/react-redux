import * as ActionTypes from "./ActionTypes";

export const loginSuccess = (userData) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: userData
});

export const logoutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
});

export const authLoading = () => ({
    type: ActionTypes.AUTH_LOADING
});