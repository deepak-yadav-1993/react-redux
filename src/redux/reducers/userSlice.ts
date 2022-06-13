import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStates, NavLocations } from '../../shared/Type';
import { RootState } from '../store';

type UsersState = {
  state: LoadingStates;
  loggedIn: boolean;
  name: string;
  email: string;
  imageUrl: string;
  googleId: string;
  accessToken: string;
  navLocation: NavLocations;
};

const initialState: UsersState = {
  state: 'idle',
  loggedIn: false,
  name: '',
  email: '',
  imageUrl: '',
  googleId: '',
  accessToken: '',
  navLocation: 'weather'
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDataReceived(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        imageUrl: string;
        googleId: string;
        accessToken: string;
      }>
    ) {
      const { payload } = action;
      const { navLocation } = state;
      return {
        ...state,
        ...payload,
        loggedIn: true,
        state: 'idle',
        navLocation
      };
    },
    userLoggedOut(state) {
      const { navLocation } = state;

      return { ...initialState, navLocation };
    },
    userInfoLoading(state) {
      state.state = 'loading';
    },
    userInfoEndLoading(state) {
      state.state = 'idle';
    },
    userNavClick(state, action: PayloadAction<NavLocations>) {
      const { payload } = action;
      state.navLocation = payload;
    }
  }
});

export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectIsloggedIn = (state: RootState) => state.user.loggedIn;
export const selectUserLoadingState = (state: RootState) => state.user.state;
export const selectNavLocation = (state: RootState) => state.user.navLocation;

export const {
  userDataReceived,
  userLoggedOut,
  userInfoLoading,
  userNavClick,
  userInfoEndLoading
} = userReducer.actions;

export default userReducer.reducer;
