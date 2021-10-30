import { createStore, combineReducers } from "redux";
import authStore from "./reducers/authStore";

const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			appState: authStore,
		}),
		// eslint-disable-next-line no-underscore-dangle
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};

export default ConfigureStore;
