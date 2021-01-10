import { MigrationManifest } from 'redux-persist';

const persistMigration: MigrationManifest = {
  0: () => {
    return { _persist: { version: 0, rehydrated: true } };
  },
};

export default persistMigration;
