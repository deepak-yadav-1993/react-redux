import * as ActionTypes from "../ActionTypes";

const defaultState = {
  loggedIn: false,
  userData: {},
  isLoading: false,
  sheetData: [],
  speadSheetId: "",
  sheetId: "",
};

export const authStore = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGEDIN:
      return { ...state, loggedIn: true, userData: action.payload };
    case ActionTypes.USER_LOGGEDOUT:
      return { ...state, loggedIn: false, userData: {} };
    case ActionTypes.LOADING_START:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_END:
      return { ...state, isLoading: false };
    case ActionTypes.SHEETS_DATA_RECIEVED:
      return { ...state, sheetData: state.sheetData.concat(action.payload) };

    default:
      return state;
  }
};
