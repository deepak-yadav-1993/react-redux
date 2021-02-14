import React from "react";
import GoogleAuthComponent from "./GoogleAuth";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RestoreIcon from "@material-ui/icons/Restore";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import ErrorComponent from "./ErrorComponent";
// import banner from "../images/banner.ai";
import {
  loginSuccess,
  logoutSuccess,
  loadingStart,
  loadingEnd,
  errorOccured,
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
    errorOccured: (error: any) => dispatch(errorOccured(error)),
  };
};

const defaultElements = {
  CONTAINER_CLASS: "component main",
  CONTENT_CLASS: "content-section",
  NAVIGATION_CLASS: "nav-section",
  COLOR_GROUP: "generic-color",
  ICON_STYLE: {
    COLOR: "white",
  },
};

class MainComponent extends React.Component<any, any> {
  render() {
    const loading = this.props.appState.isLoading ? (
      <LinearProgress color="secondary" style={{ height: "4px" }} />
    ) : (
      <div
        style={{
          height: "1vh",
        }}
      />
    );
    const overlayRender = this.props.appState.isLoading ? (
      <div id="overlay" />
    ) : null;
    let { errors } = this.props.appState;
    const errorRender = errors.length > 0 ? <ErrorComponent /> : null;
    return (
      <div
        className={`${defaultElements.CONTAINER_CLASS} ${defaultElements.COLOR_GROUP}`}
      >
        <div className="loading-container">{loading}</div>
        {overlayRender}
        <div className="error-container">{errorRender}</div>
        {/* <img src={banner} alt="banner" /> */}
        <Container fixed>
          <GoogleAuthComponent
            loggedIn={this.props.appState.loggedIn}
            onLogIn={this.props.loginSuccess}
            onLogout={this.props.logoutSuccess}
            loadingStart={this.props.loadingStart}
            loadingEnd={this.props.loadingEnd}
          />
          <BottomNavigation
            value={"test"}
            showLabels
            className={defaultElements.COLOR_GROUP}
          >
            <BottomNavigationAction
              label="Recents"
              style={{ color: defaultElements.ICON_STYLE.COLOR }}
              icon={
                <RestoreIcon
                  style={{ color: defaultElements.ICON_STYLE.COLOR }}
                />
              }
            />
            <BottomNavigationAction
              label="Favorites"
              style={{ color: defaultElements.ICON_STYLE.COLOR }}
              icon={
                <FavoriteIcon
                  style={{ color: defaultElements.ICON_STYLE.COLOR }}
                />
              }
            />
            {/* <BottomNavigationAction
            label="Nearby"
            style={{ color: defaultElements.ICON_STYLE.COLOR }}
            icon={<LocationOnIcon style={{ color: defaultElements.ICON_STYLE.COLOR }} />}
          /> */}
          </BottomNavigation>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
