import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";

const responseGoogle = (response: Object) => {
  console.log(response);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <GoogleLogin
          clientId={
            "1088646818674-i29v9olg147o24uql5v31mricnpbfonp.apps.googleusercontent.com"
          }
          className="my-facebook-button-class"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        >
          <span> Login with Google</span>
        </GoogleLogin>
      </header>
    </div>
  );
}

export default App;
