import { Request, Response } from 'express';

import products from '@fixtures/products.json';
import { RTAction } from '@interfaces/controller';

const getProducts = async (_req: Request, res: Response): Promise<RTAction> => {
  return global.ApiResponse.respond({
    data: products,
  })(res);
};

export default getProducts;
