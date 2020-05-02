import React, { Component } from "react";
import GoogleAuthComponent from "./GoogleAuth";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RestoreIcon from "@material-ui/icons/Restore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { connect } from "react-redux";
import { LinearProgress } from '@material-ui/core';
import {
  loginSuccess,
  logoutSuccess,
  authLoading,
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
    const loggedInDiv = this.props.loginState.loggedIn ? (
      <div>loggedIn</div>
    ) : (
      <div>Not loggedIN</div>
    );
    return (
      <div className={`${containerClass} ${colorClass}`}>
        <GoogleAuthComponent
          onLogIn={this.props.loginSuccess}
          onLogout={this.props.logoutSuccess}
          authLoading={this.props.authLoading}
        />
        {loggedInDiv}
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
        <LinearProgress color="secondary" style={{width: "100%"}}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
