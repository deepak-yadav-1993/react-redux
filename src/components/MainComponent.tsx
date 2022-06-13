import React from 'react';
import GoogleAuthComponent from './GoogleAuth';
import BarChart from './BarChart';
import Weather from './Weather';
import Grid from '@material-ui/core/Grid';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container
} from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import SettingsIcon from '@material-ui/icons/Settings';
import { LinearProgress } from '@material-ui/core';
import ErrorComponent from './ErrorComponent';
import { useSelector } from 'react-redux';
import {
  selectIsloggedIn,
  selectNavLocation,
  selectUserLoadingState,
  userNavClick
} from '../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import ConfigForm from './ConfigForm';

const defaultElements = {
  CONTAINER_CLASS: 'component main',
  CONTENT_CLASS: 'content-section',
  NAVIGATION_CLASS: 'nav-section',
  COLOR_GROUP: 'generic-color',
  ICON_STYLE: {
    COLOR: 'white'
  }
};

const MainComponent = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(selectIsloggedIn);
  const userLoading = useSelector(selectUserLoadingState);
  const navLocation = useSelector(selectNavLocation);
  const userInfoIsLoading = userLoading === 'loading';
  const renderLoading = userInfoIsLoading ? (
    <div className="loading-container">
      <LinearProgress color="secondary" style={{ height: '4px' }} />
    </div>
  ) : (
    <div
      style={{
        height: '2vh'
      }}
    />
  );

  const renderOverlay = userInfoIsLoading ? (
    <div className="error-container">
      <div id="overlay" />
    </div>
  ) : null;

  const renderBarChart =
    userLoggedIn && !userInfoIsLoading ? (
      <BarChart height={550} width={850} />
    ) : null;

  const renderFinancesApps = navLocation === 'finances' && (
    <>
      {renderBarChart}
      <GoogleAuthComponent />
    </>
  );

  return (
    <div
      className={`${defaultElements.CONTAINER_CLASS} ${defaultElements.COLOR_GROUP}`}
    >
      {renderLoading}
      {renderOverlay}
      <ErrorComponent />
      <Container fixed>
        <BottomNavigation
          showLabels
          className={defaultElements.COLOR_GROUP}
          value={navLocation}
          onChange={(_event, newValue) => {
            dispatch(userNavClick(newValue));
          }}
        >
          <BottomNavigationAction
            label="Finances"
            value="finances"
            style={{ color: defaultElements.ICON_STYLE.COLOR }}
            icon={
              <MonetizationOnIcon
                style={{ color: defaultElements.ICON_STYLE.COLOR }}
              />
            }
          />
          <BottomNavigationAction
            label="Weather"
            value="weather"
            style={{ color: defaultElements.ICON_STYLE.COLOR }}
            icon={
              <WbSunnyIcon
                style={{ color: defaultElements.ICON_STYLE.COLOR }}
              />
            }
          />
          <BottomNavigationAction
            label="Setup"
            value="setup"
            style={{ color: defaultElements.ICON_STYLE.COLOR }}
            icon={
              <SettingsIcon
                style={{ color: defaultElements.ICON_STYLE.COLOR }}
              />
            }
          />
        </BottomNavigation>
      </Container>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {renderFinancesApps}
        </Grid>
        <Grid item xs={12}>
          {navLocation === 'weather' && <Weather />}
        </Grid>
        {navLocation === 'setup' && (
          <Grid item xs={12}>
            <ConfigForm />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default MainComponent;
