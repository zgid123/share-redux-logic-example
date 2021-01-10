import { Request, Response } from 'express';

import profile from '@fixtures/profile.json';
import { RTAction } from '@interfaces/controller';

const getProfile = async (req: Request, res: Response): Promise<RTAction> => {
  const authToken = req.headers.authorization;

  let data: Partial<typeof profile> = {};

  if (authToken === 'Bearer AUTH_TOKEN') {
    data = profile;
  }

  return global.ApiResponse.respond({
    data,
  })(res);
};

export default getProfile;
