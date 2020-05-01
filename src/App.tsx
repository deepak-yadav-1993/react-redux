import React from "react";
import "./App.scss";
import MainComponent from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
}

export default App;
