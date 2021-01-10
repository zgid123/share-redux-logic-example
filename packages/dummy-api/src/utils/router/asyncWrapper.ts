import { Request, Response, NextFunction, RequestHandler } from 'express';

import { RTAction } from '@interfaces/controller';

export default (asyncFunc: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<RTAction> => {
  try {
    return await asyncFunc(req, res, next);
  } catch (err) {
    next(err);
  }
};
