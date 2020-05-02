import { authStore } from "./reducers/authStore";
import { createStore, combineReducers } from "redux";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      loginState: authStore,
    })
  );

  return store;
};
