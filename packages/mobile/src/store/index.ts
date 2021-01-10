import { persistStore, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { TToast } from '@share-redux/redux-common/lib/interfaces';
import {
  Store,
  store,
  Persistor,
  StoreEnhancer,
} from '@share-redux/redux-common';

import AuthService from 'services/AuthService';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import persistMigration from './persistMiration';

interface IDefaultStoreParams {
  toast: TToast;
  enhancers?: StoreEnhancer[];
}

interface IRDefaultStoreProps {
  store: Store;
  persistor: Persistor;
}

const defaultStore = ({
  toast,
  enhancers,
}: IDefaultStoreParams): IRDefaultStoreProps => {
  // magic comment to force babel-plugin-inline-dotenv to receive BUILD_ENV
  // process.env.BUILD_ENV

  const reduxStore = store({
    enhancers,
    injectEpics: rootEpic,
    dependencies: { toast },
    injectReducer: rootReducer,
    apiConfig: {
      authService: AuthService,
      endpoint: process.env.API_ENDPOINT || '',
    },
    persistConfig: {
      version: 0,
      key: 'root',
      storage: AsyncStorage,
      whitelist: ['products'],
      migrate: createMigrate(persistMigration, { debug: true }),
    },
  });

  const persistor = persistStore(reduxStore);

  return { store: reduxStore, persistor };
};

export default defaultStore;
