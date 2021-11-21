import * as ActionTypes from './ActionTypes';
import { ErrorType } from '../shared/Type';
import { type } from 'os';

export const onLoginSuccess = (userData: any) => ({
  type: ActionTypes.USER_LOGGEDIN,
  payload: userData
});

export const onLogoutSuccess = () => ({
  type: ActionTypes.USER_LOGGEDOUT
});

export const onLoadingStart = () => ({
  type: ActionTypes.LOADING_START
});

export const onLoadingEnd = () => ({
  type: ActionTypes.LOADING_END
});

export const onSheetsDataRecieved = (sheetData: any) => ({
  type: ActionTypes.SHEETS_DATA_RECIEVED,
  payload: sheetData
});

export const onErrorOccured = (error: ErrorType) => ({
  type: ActionTypes.ERROR_OCCURED,
  payload: error
});

export const onErrorDismissed = (index: number) => ({
  type: ActionTypes.ERROR_DISMISSED,
  payload: index
});

export const onNavigationToggle = (navItem: string) => ({
  type: ActionTypes.NAVIGATION_TOGGLE,
  payload: navItem
});
