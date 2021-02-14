import * as ActionTypes from "./ActionTypes";

export const loginSuccess = (userData) => ({
  type: ActionTypes.USER_LOGGEDIN,
  payload: userData,
});

export const logoutSuccess = () => ({
  type: ActionTypes.USER_LOGGEDOUT,
});

export const loadingStart = () => ({
  type: ActionTypes.LOADING_START,
});

export const loadingEnd = () => ({
  type: ActionTypes.LOADING_END,
});

export const sheetsDataRecieved = (sheetData) => ({
  type: ActionTypes.SHEETS_DATA_RECIEVED,
  payload: sheetData,
});

export const errorOccured = (error) => ({
  type: ActionTypes.ERROR_OCCURED,
  payload: error,
});

export const errorDismissed = (index) => ({
  type: ActionTypes.ERROR_DISMISSED,
  payload: index,
});
