import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { clientId, ApiKey } from "../shared/GoogleAuthCreds";
import { useGoogleLogin } from "react-google-login";

const containerClass = "component google-auth";

function GoogleAuth(props: any) {
  const loginSuccess = (response: any) => {
    let userProfile = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
      googleId: response.profileObj.googleId,
    };
    props.onLogIn(userProfile);
    props.authLoadingEnd();
    console.log(userProfile);
  };
  // componentDidMount() {
  //   setTimeout(() => {
  //     const loggedInAlready = gapi.auth2.getAuthInstance().isSignedIn.get();
  //     const profile = gapi.auth2.getAuthInstance().currentUser.get().Qt;
  //     console.log(profile);
  //     if (loggedInAlready) {
  //       const userData = {
  //         name: profile.Ad,
  //         email: profile.zu,
  //         imageUrl: profile.gl,
  //         googleId: response.ZU,
  //       };
  //     }
  //   }, 3000);
  // }

  const loginfailed = (response: Object) => {
    console.log(response);
    props.authLoadingEnd();
  };

  const logout = () => {
    console.log("Logged Out");
    props.onLogout();
    props.authLoadingEnd();
  };

  return (
    <div className={containerClass} onClick={(e) => props.authLoading()}>
      {props.loggedIn ? (
        <GoogleLogout
          clientId={clientId}
          className="my-google-button-class"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={clientId}
          className="my-google-button-class"
          onSuccess={loginSuccess}
          onFailure={loginfailed}
          buttonText="Login with Google"
        ></GoogleLogin>
      )}
    </div>
  );
}

export default GoogleAuth;
