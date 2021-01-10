import { join } from 'path';
import { existsSync } from 'fs';
import { Router, RequestHandler } from 'express';

import readdirAsync from '../readdirAsync';

interface IImportPackageParams {
  path: string;
  name: string;
  folderPath?: string;
  defaultMiddlewares?: RequestHandler[];
}

const importCollection = ({
  path,
  name,
  folderPath = '',
  defaultMiddlewares = [],
}: IImportPackageParams): Router => {
  const rootRouter = Router();

  const endpointsFolderPath = join(path, folderPath);

  readdirAsync(endpointsFolderPath).then((folders) => {
    folders.forEach(async (folder) => {
      const endpointFolderPath = join(endpointsFolderPath, folder);
      const skipImport =
        !existsSync(join(endpointFolderPath, 'index.js')) &&
        !existsSync(join(endpointFolderPath, 'index.ts'));

      if (skipImport) {
        return;
      }

      const { default: router } = await import(endpointFolderPath);

      rootRouter.use(`/${join(name, folder)}`, ...defaultMiddlewares, router);
    });
  });

  return rootRouter;
};

export default importCollection;
