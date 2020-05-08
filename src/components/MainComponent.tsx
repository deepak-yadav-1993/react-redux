import React, { Component } from "react";
import GoogleAuthComponent from "./GoogleAuth";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RestoreIcon from "@material-ui/icons/Restore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { connect } from "react-redux";
import { LinearProgress } from '@material-ui/core';
// import banner from "../images/banner.ai";
import {
  loginSuccess,
  logoutSuccess,
  authLoading,
  authLoadingEnd
} from "../redux/ActionCreaters";

const mapStateToProps = (state: any) => {
  return {
    loginState: state.loginState,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginSuccess: (userdata: Object) => dispatch(loginSuccess(userdata)),
    logoutSuccess: () => dispatch(logoutSuccess()),
    authLoading: () => dispatch(authLoading()),
    authLoadingEnd: () => dispatch(authLoadingEnd())
  };
};

const containerClass = "component main";
const colorClass = "generic-color";
const iconStyleConfigs = {
  color: "white",
};

class MainComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const loading = this.props.loginState.isLoading ? <LinearProgress color="secondary" style={{width: "100%", height: "4px"}}/> : <div style={{width: "100%", height: "4px"}}></div> ;
    return (
      <div className={`${containerClass} ${colorClass}`}>
        {/* <img src={banner} alt="banner" /> */}
        <GoogleAuthComponent
          loggedIn={this.props.loginState.loggedIn}
          onLogIn={this.props.loginSuccess}
          onLogout={this.props.logoutSuccess}
          authLoading={this.props.authLoading}
          authLoadingEnd={this.props.authLoadingEnd}
        />
        <BottomNavigation value={"test"} showLabels className={colorClass}>
          <BottomNavigationAction
            label="Recents"
            style={{ color: iconStyleConfigs.color }}
            icon={<RestoreIcon style={{ color: iconStyleConfigs.color }} />}
          />
          <BottomNavigationAction
            label="Favorites"
            style={{ color: iconStyleConfigs.color }}
            icon={<FavoriteIcon style={{ color: iconStyleConfigs.color }} />}
          />
          <BottomNavigationAction
            label="Nearby"
            style={{ color: iconStyleConfigs.color }}
            icon={<LocationOnIcon style={{ color: iconStyleConfigs.color }} />}
          />
        </BottomNavigation>
        {loading}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
