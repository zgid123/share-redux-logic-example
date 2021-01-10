import storage from 'redux-persist/lib/storage';
import { store } from '@share-redux/redux-common';
import { persistStore, createMigrate } from 'redux-persist';
import { TToast } from '@share-redux/redux-common/lib/interfaces';

import AuthService from 'services/AuthService';

import persistMigration from './persistMiration';

interface IDefaultStoreParams {
  toast: TToast;
}

const defaultStore = ({ toast }: IDefaultStoreParams) => {
  const reduxStore = store({
    dependencies: { toast },
    apiConfig: {
      authService: AuthService,
      endpoint: process.env.REACT_APP_API_ENDPOINT || '',
    },
    persistConfig: {
      storage,
      version: 0,
      key: 'root',
      migrate: createMigrate(persistMigration, { debug: true }),
    },
  });

  const persistor = persistStore(reduxStore);

  return { store: reduxStore, persistor };
};

export default defaultStore;
