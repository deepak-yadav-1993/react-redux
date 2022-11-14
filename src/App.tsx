import React from 'react';
import './App.scss';
import MainComponent from './components/MainComponent';
import { Provider } from 'react-redux';
import store from './redux/store';

// Test
function App() {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
}

export default App;
