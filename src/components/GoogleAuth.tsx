import React, { useEffect, useCallback } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { transformErrorMessage } from './ErrorComponent';
import {
  selectIsloggedIn,
  userDataReceived,
  userInfoEndLoading,
  userInfoLoading,
  userLoggedOut
} from '../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import {
  getSheetData,
  selectFileId,
  selectSheetGID
} from '../redux/reducers/sheetDataSlice';
import { useSelector } from 'react-redux';
import { errorOcurred } from '../redux/reducers/errorSlice';

const containerClass = 'component google-auth';

// using react-env for local development but setting environment variable when publishing docker image
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleAuth = () => {
  useEffect(() => {
    window.addEventListener('click', onClickHandler);
    return () => {
      window.removeEventListener('click', onClickHandler);
    };
  });
  const dispatch = useDispatch();

  const onClickHandler = (event: any) => {
    const buttonElement = document.querySelector(
      '.my-google-button-class logout'
    ) as unknown as any;
    const { target } = event;
    if (buttonElement?.contains(target)) {
      dispatch(userLoggedOut());
      event.stopPropagation();
    }
  };

  const groupId = useSelector(selectSheetGID);
  const fileId = useSelector(selectFileId);
  const loggedIn = useSelector(selectIsloggedIn);

  const handleLoginSuccess = useCallback(
    (response: any) => {
      const { accessToken, profileObj } = response;
      const { name, email, imageUrl, googleId } = profileObj;
      dispatch(
        userDataReceived({ name, email, imageUrl, googleId, accessToken })
      );
      dispatch(getSheetData({ groupId, fileId }));
    },
    [groupId, fileId]
  );

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  const handleLoginFailed = (error: any) => {
    dispatch(errorOcurred(transformErrorMessage(error)?.message));
    dispatch(userInfoEndLoading());
  };

  const _renderButton = (clientIdGoogle: string) => {
    return loggedIn ? (
      <>
        <GoogleLogout
          key="google-logout-button"
          clientId={clientIdGoogle}
          className="my-google-button-class logout"
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        />
      </>
    ) : (
      <>
        <GoogleLogin
          key="google-login-button"
          clientId={clientIdGoogle}
          className="my-google-button-class login"
          onRequest={() => dispatch(userInfoLoading())}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailed}
          scope="https://www.googleapis.com/auth/admin.reports.audit.readonly https://www.googleapis.com/auth/spreadsheets"
          isSignedIn={true}
          buttonText="Login with Google"
        />
      </>
    );
  };
  return (
    <>
      {googleClientId && (
        <div className={containerClass}>{_renderButton(googleClientId)}</div>
      )}
    </>
  );
};

export default GoogleAuth;
