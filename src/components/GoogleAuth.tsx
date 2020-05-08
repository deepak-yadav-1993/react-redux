import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { clientId, ApiKey } from "../shared/GoogleAuthCreds";

const containerClass = "component google-auth";

class GoogleAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const loginSuccess = (response: any) => {
      let userProfile = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl,
        googleId: response.profileObj.googleId,
      };
      this.props.onLogIn(userProfile);
      this.props.authLoadingEnd();
      console.log(userProfile);
    };

    const logout = () => {
      console.log("Logged Out");
      this.props.onLogout();
      this.props.authLoadingEnd();
    };

    const loginfailed = (response: Object) => {
      console.log(response);
      this.props.authLoadingEnd();
    };

    return (
      <div className={containerClass} onClick={(e) => this.props.authLoading()}>
        {this.props.loggedIn ? (
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
            isSignedIn={true}
            buttonText="Login with Google"
          ></GoogleLogin>
        )}
      </div>
    );
  }
}

export default GoogleAuth;
