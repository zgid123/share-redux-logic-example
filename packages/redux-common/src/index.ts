import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import {
  FLUSH,
  PURGE,
  PAUSE,
  PERSIST,
  Storage,
  REGISTER,
  REHYDRATE,
  persistReducer,
  PersistMigrate,
} from 'redux-persist';
import {
  Store,
  Reducer,
  AnyAction,
  CombinedState,
  StoreEnhancer,
  configureStore,
  combineReducers,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';

import rootEpic from './common/rootEpic';
import { TDependencies } from './interfaces';
import rootReducer from './common/rootReducer';
import API, { IConfigParams } from './services/API';

export type { Persistor } from 'redux-persist';
export { PersistGate } from 'redux-persist/integration/react';
export { Provider, useStore, useDispatch, useSelector } from 'react-redux';
export type { PayloadAction, Store, StoreEnhancer } from '@reduxjs/toolkit';
export { createSlice, combineReducers, createAction } from '@reduxjs/toolkit';

export type { TCombinedReducer } from './interfaces';
export type { TRootState } from './common/rootReducer';
export type { IAuthServiceStatic } from './services/API';

export { default as API } from './services/API';
export { staticImplements } from './utils/interfaceHelpers';

interface IPersistConfigProps {
  key: string;
  version: number;
  storage: Storage;
  whitelist?: string[];
  blacklist?: string[];
  migrate: PersistMigrate;
}

interface IStoreParams {
  injectEpics?: Epic[];
  apiConfig?: IConfigParams;
  enhancers?: StoreEnhancer[];
  persistConfig?: IPersistConfigProps;
  dependencies?: Partial<Omit<TDependencies, 'API'>>;
  injectReducer?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: Reducer<CombinedState<any>, AnyAction>;
  };
}

export const store = ({
  apiConfig,
  injectReducer,
  enhancers = [],
  injectEpics = [],
  dependencies = {} as TDependencies,
  persistConfig = {} as IPersistConfigProps,
}: IStoreParams): Store => {
  if (apiConfig) {
    API.config(apiConfig);
  }

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      ...dependencies,
      API,
    },
  });

  let devTools: ConfigureStoreOptions['devTools'] | false = false;

  if (
    (process.env.REACT_APP_CUSTOM_NODE_ENV || process.env.NODE_ENV) !==
    'production'
  ) {
    devTools = {
      name: 'Share redux logic',
    };
  }

  const reducer = combineReducers({ ...rootReducer, ...injectReducer });
  const persistedReducer = persistReducer(
    {
      ...persistConfig,
      blacklist: [...(persistConfig.blacklist || []), 'auth'],
    },
    reducer,
  );

  const store = configureStore({
    devTools,
    enhancers,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ['payload.callback'],
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).prepend(epicMiddleware);

      return middleware;
    },
  });

  epicMiddleware.run(combineEpics(...rootEpic.concat(injectEpics)));

  return store;
};
