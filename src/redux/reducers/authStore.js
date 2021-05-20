/* eslint-disable indent */
import * as ActionTypes from "../ActionTypes";

const defaultState = {
	loggedIn: false,
	userData: {},
	isLoading: false,
	header: [],
	data: [],
	speadSheetId: "1UhEWbuFZGbAP1UIZ0PBxE7UgoW2bjOSnlSJuBSOnemE",
	sheetId: "Finances",
	errors: [
		{ index: 0, code: 502, message: "hello" },
		{ index: 1, code: 404, message: "not found" },
	],
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
			return {
				...state,
				header: state.header.concat(action.payload.header),
				data: state.header.concat(action.payload.data),
			};
		case ActionTypes.ERROR_OCCURED: {
			const index = state.errors.length++;
			return {
				...state,
				errors: state.errors.concat({ ...action.payload, index }),
			};
		}
		case ActionTypes.ERROR_DISMISSED:
			return {
				...state,
				errors: state.errors.filter((error) => {
					return error.index !== action.payload;
				}),
			};
		default:
			return state;
	}
};
