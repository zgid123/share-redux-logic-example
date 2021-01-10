/* eslint-disable no-console */
import { Router } from 'express';
import { join, resolve } from 'path';

import readdirAsync from '@utils/readdirAsync';

const init = async (router: Router): Promise<void> => {
  const collectionsPath = resolve(__dirname, '../api');

  return readdirAsync(collectionsPath)
    .then((collections) => {
      collections.forEach(async (collectionPath) => {
        collectionPath = join(collectionsPath, collectionPath);

        const { default: collectionHandler } = await import(collectionPath);

        router.use(collectionHandler);
      });
    })
    .then(() => {
      console.log('Router ready');
    })
    .catch((err) => {
      console.log(err);
    });
};

const initRouter = async (router: Router): Promise<void> => {
  return init(router);
};

export default initRouter;
