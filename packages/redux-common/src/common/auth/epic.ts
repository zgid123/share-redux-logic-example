/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { from, of } from 'rxjs';
import { AnyAction } from 'redux';
import { Epic, ofType } from 'redux-observable';
import { exhaustMap, map, tap, catchError } from 'rxjs/operators';

import { TDependencies } from '../../interfaces';
import { IAuthStateProps } from './slice.interface';
import { IAuthResponseProps } from './epic.interface';
import {
  error,
  clear,
  assignProfile,
  authenticating,
  refreshAuthToken,
} from './slice';

export const clearAuthEpic: Epic<AnyAction, AnyAction, any, TDependencies> = (
  action$,
  _state$,
  { API },
) => {
  return action$.pipe(
    ofType('CLEAR_AUTH'),
    tap(() => {
      API.Auth.clearToken();
      API.Auth.clearRefreshToken();
    }),
    map(() => {
      return clear();
    }),
  );
};

export const authenticatingEpic: Epic = (action$) => {
  return action$.pipe(
    ofType('SIGN_IN'),
    map(() => {
      return authenticating();
    }),
  );
};

export const authenticateEpic: Epic<
  AnyAction,
  AnyAction,
  any,
  TDependencies
> = (action$, _state$, { toast, API }) => {
  return action$.pipe(
    ofType('SIGN_IN'),
    exhaustMap((action) => {
      const { data, callback } = action.payload;

      return from(
        API.post<IAuthResponseProps>({
          data,
          endpoint: '/auth/login',
        }),
      ).pipe(
        tap(({ data: { authToken, refreshToken } }) => {
          API.Auth.setToken(authToken);
          API.Auth.setRefreshToken(refreshToken);
        }),
        map(({ data: { profile } }) => {
          callback?.();

          return assignProfile(profile);
        }),
        catchError((e) => {
          toast?.({ description: e.message });

          return of(error());
        }),
      );
    }),
  );
};

export const autoLoginEpic: Epic<AnyAction, AnyAction, any, TDependencies> = (
  action$,
  state$,
  { API },
) => {
  if (state$.value.auth.email) {
    return action$.pipe();
  }

  return action$.pipe(
    ofType('AUTO_LOGIN'),
    exhaustMap(() => {
      return from(API.Auth.token()).pipe(
        exhaustMap((token) => {
          if (!token) {
            return of(refreshAuthToken());
          }

          return from(
            API.get<{ data: IAuthStateProps['profile'] }>({
              endpoint: '/profile',
            }),
          ).pipe(
            map(({ data }) => {
              return assignProfile(data);
            }),
            catchError(() => {
              return of(refreshAuthToken());
            }),
          );
        }),
        catchError(() => {
          return of(refreshAuthToken());
        }),
      );
    }),
  );
};

export const refreshAuthTokenEpic: Epic<
  AnyAction,
  AnyAction,
  any,
  TDependencies
> = (action$, _state$, { API }) => {
  return action$.pipe(
    ofType('REFRESH_AUTH_TOKEN'),
    exhaustMap(() => {
      return from(API.Auth.refreshToken()).pipe(
        exhaustMap((token) => {
          if (!token) {
            return of(error());
          }

          return from(
            API.post<IAuthResponseProps>({
              endpoint: '/auth/refresh',
              data: {
                refreshToken: token,
              },
            }),
          ).pipe(
            map(({ data: { authToken, refreshToken, profile } }) => {
              API.Auth.setToken(authToken);
              API.Auth.setRefreshToken(refreshToken);

              return assignProfile(profile);
            }),
            catchError(() => {
              API.Auth.clearToken();
              API.Auth.clearRefreshToken();

              return of(error());
            }),
          );
        }),
        catchError(() => {
          return of(refreshAuthToken());
        }),
      );
    }),
  );
};
