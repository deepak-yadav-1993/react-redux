import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { clientId, ApiKey } from "../shared/GoogleAuthCreds";

const loginSuccess = (response: any) => {
  let userProfile = {
    name: response.profileObj.name,
    email: response.profileObj.email,
    imageUrl: response.profileObj.imageUrl,
    googleId: response.profileObj.googleId,
  };
  console.log(response);
};

const loginfailed = (response: Object) => {
  console.log(response);
};

const logout = () => {
  console.log("Logged Out");
};

const containerClass = "component google-auth";

function GoogleAuth() {
  return (
    <div className={containerClass}>
      <GoogleLogin
        clientId={clientId}
        className="my-google-button-class"
        onSuccess={loginSuccess}
        onFailure={loginfailed}
      >
        <span> Login with Google</span>
      </GoogleLogin>
      <GoogleLogout
        clientId={clientId}
        className="my-google-button-class"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
}

export default GoogleAuth;
