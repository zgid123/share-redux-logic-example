import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthStateProps, ISignInPayloadProps } from './slice.interface';

const initialState: IAuthStateProps = {
  loadingState: 'autoLogingIn',
  profile: {
    lastName: '',
    firstName: '',
  },
};

const authSlice = createSlice({
  initialState,
  name: 'Authenticate',
  reducers: {
    authenticating(state) {
      state.loadingState = 'loading';
    },
    assignProfile(state, action: PayloadAction<IAuthStateProps['profile']>) {
      state.loadingState = 'loaded';
      state.profile = action.payload;
    },
    error(state) {
      state.loadingState = 'loaded';
    },
    clear(state) {
      state.profile = initialState.profile;
    },
  },
});

const reducer = authSlice.reducer;

export const clearAuth = createAction('CLEAR_AUTH');
export const autoLogin = createAction('AUTO_LOGIN');
export const refreshAuthToken = createAction('REFRESH_AUTH_TOKEN');
export const signIn = createAction<ISignInPayloadProps, 'SIGN_IN'>('SIGN_IN');

export const {
  clear,
  error,
  assignProfile,
  authenticating,
} = authSlice.actions;

export type TAuthState = ReturnType<typeof reducer>;

export default reducer;
