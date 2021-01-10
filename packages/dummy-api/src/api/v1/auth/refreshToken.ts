import permitParams from 'permit-params';
import { Request, Response } from 'express';

import token from '@fixtures/token.json';
import profile from '@fixtures/profile.json';
import { RTAction } from '@interfaces/controller';

interface IRefreshTokenParams {
  refreshToken: string;
}

const refreshToken = async (req: Request, res: Response): Promise<RTAction> => {
  const { HttpError, ApiResponse } = global;
  const { refreshToken } = permitParams<IRefreshTokenParams>(
    req.body,
    'refreshToken',
  );

  if (refreshToken === 'REFRESH_TOKEN') {
    return ApiResponse.respond({
      data: {
        profile,
        ...token,
      },
    })(res);
  } else {
    throw HttpError.unauthorized({ message: 'Invalid token' });
  }
};

export default refreshToken;
