import { authStore } from "./reducers/authStore";
import { createStore, combineReducers } from "redux";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      loginState: authStore,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
