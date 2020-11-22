import React, { Component } from "react";
import GoogleAuthComponent from "./GoogleAuth";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RestoreIcon from "@material-ui/icons/Restore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
// import banner from "../images/banner.ai";
import {
  loginSuccess,
  logoutSuccess,
  loadingStart,
  loadingEnd,
} from "../redux/ActionCreaters";

const mapStateToProps = (state: any) => {
  return {
    appState: state.appState,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginSuccess: (userdata: Object) => dispatch(loginSuccess(userdata)),
    logoutSuccess: () => dispatch(logoutSuccess()),
    loadingStart: () => dispatch(loadingStart()),
    loadingEnd: () => dispatch(loadingEnd()),
  };
};

const defaultElements = {
  CONTAINER_CLASS: "component main",
  COLOR_GROUP: "generic-color",
  ICON_STYLE: {
    COLOR: "white",
  },
};

class MainComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const loading = this.props.appState.isLoading
      ? <LinearProgress
          color="secondary"
          style={{
            width: "inherit",
            height: "4px",
            position: "absolute",
            top: "1%",
          }}
        />
      : <div
          style={{
            width: "inherit",
            height: "4px",
            position: "absolute",
            top: "1%",
          }}
        />;
    return (
      <div className={`${defaultElements.CONTAINER_CLASS} ${defaultElements.COLOR_GROUP}`}>
        {loading}
        {/* <img src={banner} alt="banner" /> */}
        <GoogleAuthComponent
          loggedIn={this.props.appState.loggedIn}
          onLogIn={this.props.loginSuccess}
          onLogout={this.props.logoutSuccess}
          loadingStart={this.props.loadingStart}
          loadingEnd={this.props.loadingEnd}
        />
        <BottomNavigation value={"test"} showLabels className={defaultElements.COLOR_GROUP}>
          <BottomNavigationAction
            label="Recents"
            style={{ color: defaultElements.ICON_STYLE.COLOR }}
            icon={<RestoreIcon style={{ color: defaultElements.ICON_STYLE.COLOR }} />}
          />
          <BottomNavigationAction
            label="Favorites"
            style={{ color: defaultElements.ICON_STYLE.COLOR }}
            icon={<FavoriteIcon style={{ color: defaultElements.ICON_STYLE.COLOR }} />}
          />
          {/* <BottomNavigationAction
            label="Nearby"
            style={{ color: defaultElements.ICON_STYLE.COLOR }}
            icon={<LocationOnIcon style={{ color: defaultElements.ICON_STYLE.COLOR }} />}
          /> */}
        </BottomNavigation>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
