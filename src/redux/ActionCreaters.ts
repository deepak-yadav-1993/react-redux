import * as ActionTypes from "./ActionTypes";
import { ErrorType } from "../shared/Type";

export const loginSuccess = (userData: any) => ({
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

export const sheetsDataRecieved = (sheetData: any) => ({
  type: ActionTypes.SHEETS_DATA_RECIEVED,
  payload: sheetData,
});

export const errorOccured = (error: ErrorType) => ({
  type: ActionTypes.ERROR_OCCURED,
  payload: error,
});

export const errorDismissed = (index: number) => ({
  type: ActionTypes.ERROR_DISMISSED,
  payload: index,
});
