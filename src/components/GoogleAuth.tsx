import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { clientId } from "../shared/GoogleAuthCreds";
import apiService from "../shared/ApiCallService";
import { connect } from "react-redux";
import { sheetsDataRecieved } from "../redux/ActionCreaters";

const containerClass = "component google-auth";

const mapStateToProps = (state: any) => {
  return {
    sheetData: state.sheetData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sheetsDataRecieved: (sheetData: any) => dispatch(sheetsDataRecieved(sheetData)),
  };
};
class GoogleAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const loginSuccess = async (response: any) => {
      let userProfile = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl,
        googleId: response.profileObj.googleId,
      };
      this.props.onLogIn(userProfile);

      let sheet = {
        spreadsheetId: "1UhEWbuFZGbAP1UIZ0PBxE7UgoW2bjOSnlSJuBSOnemE",
        sheetId: "Finances",
      };
      let sheets = await new apiService(response.accessToken).getSheetData(sheet);
      this.props.sheetsDataRecieved(sheets);
      this.props.loadingEnd();
    };

    const logout = () => {
      console.log("Logged Out");
      this.props.onLogout();
      this.props.loadingEnd();
    };

    const loginfailed = (response: Object) => {
      console.log(response);
      this.props.loadingEnd();
    };

    return (
      <div className={containerClass} onClick={e => this.props.loadingStart()}>
        {this.props.loggedIn
          ? <GoogleLogout
              clientId={clientId}
              className="my-google-button-class"
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
          : <GoogleLogin
              clientId={clientId}
              className="my-google-button-class"
              onSuccess={loginSuccess}
              onFailure={loginfailed}
              scope="https://www.googleapis.com/auth/spreadsheets"
              isSignedIn={true}
              buttonText="Login with Google"
            />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
