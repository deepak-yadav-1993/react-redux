import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { clientId, ApiKey } from "../shared/GoogleAuthCreds";
import axios from "axios";

const containerClass = "component google-auth";

class GoogleAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const allSheetsObtained = ({ data }: any) => {
      let parser = new DOMParser();
      let ids = parser
        .parseFromString(data, "text/xml")
        .getElementsByTagName("id");
      let titles = parser
        .parseFromString(data, "text/xml")
        .getElementsByTagName("title");

      let elements = Array.from(titles).map((ele, index) => {
        let uri = ids[index].childNodes[0].nodeValue;
        if (uri) {
          return {
            name: ele.childNodes[0].nodeValue,
            id: uri.split("full/")[1],
          };
        }
      });
      console.log(elements);
    };
    
    const loginSuccess = (response: any) => {
      let userProfile = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl,
        googleId: response.profileObj.googleId,
      };
      this.props.onLogIn(userProfile);
      this.props.authLoadingEnd();
      axios
        .get(
          `https://spreadsheets.google.com/feeds/spreadsheets/private/full?access_token=${response.accessToken}`
        )
        .then(allSheetsObtained)
        .catch(error => console.log(error));
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
            scope="https://www.googleapis.com/auth/spreadsheets"
            isSignedIn={true}
            buttonText="Login with Google"
          ></GoogleLogin>
        )}
      </div>
    );
  }
}

export default GoogleAuth;
