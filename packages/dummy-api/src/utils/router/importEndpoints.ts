import { join } from 'path';
import { existsSync } from 'fs';
import { RequestHandler, Router } from 'express';

import { IEndpointConfigProps } from '@interfaces/router';

import asyncWrapper from './asyncWrapper';

interface IImportEndpointsParams {
  path: string;
  endpointConfig: IEndpointConfigProps;
}

const importEndpoints = ({
  path: rootPath,
  endpointConfig = {},
}: IImportEndpointsParams): Router => {
  const router = Router();

  Promise.all(
    Object.entries(endpointConfig).map(async ([fileName, options]) => {
      const filePath = join(rootPath, fileName);

      if (!existsSync(`${filePath}.js`) && !existsSync(`${filePath}.ts`)) {
        return;
      }

      const { default: route } = await import(filePath);

      return { route: route as RequestHandler, options };
    }),
  ).then((routes) => {
    for (const route of routes) {
      if (!route) {
        continue;
      }

      const { route: handler, options } = route;
      const { middlewares = [], path, httpMethod, alias } = options;

      router[httpMethod](path, ...middlewares, asyncWrapper(handler));

      if (alias) {
        router[httpMethod](alias, ...middlewares, asyncWrapper(handler));
      }
    }
  });

  return router;
};

export default importEndpoints;
