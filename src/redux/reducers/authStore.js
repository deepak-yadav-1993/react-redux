import * as ActionTypes from "../ActionTypes";

const defaultState = {
  loggedIn: false,
  userData: {},
  isLoading: false,
  sheetData: [],
  speadSheetId: "1UhEWbuFZGbAP1UIZ0PBxE7UgoW2bjOSnlSJuBSOnemE",
  sheetId: "Finances",
  errors: [],
};

export const authStore = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGEDIN:
      return { ...state, loggedIn: true, userData: action.payload };
    case ActionTypes.USER_LOGGEDOUT:
      return defaultState;
    case ActionTypes.LOADING_START:
      return { ...state, isLoading: true };
    case ActionTypes.LOADING_END:
      return { ...state, isLoading: false };
    case ActionTypes.SHEETS_DATA_RECIEVED:
      return { ...state, sheetData: state.sheetData.concat(action.payload) };
    case ActionTypes.ERROR_OCCURED:
      return { ...state, errors: state.errors.concat(action.payload) };
    case ActionTypes.ERROR_DISMISSED:
      return {
        ...state,
        errors: state.errors.filter((item, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
};
