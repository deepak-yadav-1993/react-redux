import React from "react";
import GoogleAuthComponent from "./GoogleAuth";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RestoreIcon from "@material-ui/icons/Restore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  loginSuccess,
  logoutSuccess,
  authLoading
} from "../redux/ActionCreaters";

const containerClass= 'component main';
const colorClass = "generic-color"
const iconStyleConfigs = {
  color: "white"
}

function MainComponent() {
  return (
    <div className={`${containerClass} ${colorClass}`}>
      <GoogleAuthComponent />
      <BottomNavigation value={"test"} showLabels className={colorClass} >
        <BottomNavigationAction label="Recents" style={{ color: iconStyleConfigs.color }} icon={<RestoreIcon style={{ color: iconStyleConfigs.color }}/>} />
        <BottomNavigationAction label="Favorites" style={{ color: iconStyleConfigs.color }} icon={<FavoriteIcon style={{ color: iconStyleConfigs.color }} />} />
        <BottomNavigationAction label="Nearby" style={{ color: iconStyleConfigs.color }} icon={<LocationOnIcon style={{ color: iconStyleConfigs.color }} />} />
      </BottomNavigation>
    </div>
  );
}

export default MainComponent;
