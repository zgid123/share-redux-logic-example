import { RequestHandler } from 'express-serve-static-core';

export interface IEndpointConfigProps {
  [key: string]: {
    path: string;
    alias?: string;
    middlewares?: RequestHandler[];
    httpMethod: 'get' | 'post' | 'put' | 'delete';
    [key: string]: string | undefined | RequestHandler[];
  };
}
