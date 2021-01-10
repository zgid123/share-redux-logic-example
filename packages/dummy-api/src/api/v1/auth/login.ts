import permitParams from 'permit-params';
import { Request, Response } from 'express';

import token from '@fixtures/token.json';
import profile from '@fixtures/profile.json';
import { RTAction } from '@interfaces/controller';

interface ILoginParams {
  email: string;
  password: string;
}

const login = async (req: Request, res: Response): Promise<RTAction> => {
  const { HttpError, ApiResponse } = global;
  const { email, password } = permitParams<ILoginParams>(
    req.body,
    'email',
    'password',
  );

  if (email === 'test@gmail.com' && password === '123123') {
    return ApiResponse.respond({
      data: {
        profile,
        ...token,
      },
    })(res);
  } else {
    throw HttpError.unauthorized({ message: 'Invalid email or password' });
  }
};

export default login;
