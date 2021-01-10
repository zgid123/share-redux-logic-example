/* eslint-disable no-console */
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { Request, Response, NextFunction } from 'express';

import HttpError from '@services/HttpError';
import ApiResponse from '@services/ApiResponse';
import { RTAction } from '@interfaces/controller';

const exceptionHandler = (
  error: HttpError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): RTAction => {
  let errResult;
  let status = 500;

  if (error instanceof HttpError) {
    status = error.status;
    const { code, content, message } = error;

    errResult = {
      message,
      ...omitBy(
        {
          code,
          content,
        },
        isNil,
      ),
    };
  } else {
    const message =
      (typeof error === 'string' ? error : error.message) ||
      'Something went wrong!';

    errResult = {
      message,
    };
  }

  console.log(errResult);

  if (error.stack) {
    console.log(error.stack);
  }

  return ApiResponse.respond({
    ...errResult,
    statusCode: status,
  })(res);
};

export default exceptionHandler;
