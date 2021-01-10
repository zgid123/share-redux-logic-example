import {
  Reducer,
  CombinedState,
  StateFromReducersMapObject,
  ActionFromReducersMapObject,
} from '@reduxjs/toolkit';

import API from './services/API';

interface IToastParams {
  title?: string;
  duration?: number;
  description?: string;
  status?: 'error' | 'success' | 'warning' | 'info';
}

export type TToast = (
  params: IToastParams,
) => string | number | undefined | void;

export type TDependencies = {
  toast?: TToast;
  API: typeof API;
};

/* eslint-disable @typescript-eslint/indent */
export type TCombinedReducer<T> = Reducer<
  CombinedState<StateFromReducersMapObject<T>>,
  ActionFromReducersMapObject<T>
>;
/* eslint-enable @typescript-eslint/indent */
