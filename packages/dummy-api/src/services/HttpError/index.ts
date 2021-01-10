export interface IContentProps {
  [key: string]: string | number | boolean | IContentProps;
}

interface IErrorParams {
  code?: number;
  content?: IContentProps;
}

interface IConstructorParams extends IErrorParams {
  status: number;
  message: string | Record<string, unknown>;
}

interface IBadRequestParams extends IErrorParams {
  message: string | Record<string, unknown>;
}

interface INotFoundParams {
  record: 'User';
}

interface IUnauthorizedParams {
  message?: string;
}

interface IForbiddenParams {
  message?: string;
}

interface IUnprocessableEntityParams {
  message?: string;
}

interface IInvalidParameterParams {
  status?: number;
  message: string;
  content?: IContentProps;
}

class HttpError extends Error {
  public readonly code?: number;
  public readonly name!: string;
  public readonly status!: number;
  public readonly content?: IContentProps;

  public constructor({ message, status, content, code }: IConstructorParams) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }

    this.code = code;
    this.status = status;
    this.content = content;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public static badRequest({
    code,
    content,
    message = '',
  }: IBadRequestParams): HttpError {
    return new HttpError({ message, status: 400, code, content });
  }

  public static notFound({ record }: INotFoundParams): HttpError {
    return new HttpError({ status: 404, message: `${record} not found` });
  }

  public static unauthorized({
    message = '',
  }: IUnauthorizedParams = {}): HttpError {
    return new HttpError({
      status: 401,
      message: message || 'You are not authorized.',
    });
  }

  public static forbidden({ message = '' }: IForbiddenParams = {}): HttpError {
    return new HttpError({
      status: 403,
      message: message || 'You are not allowed to do this action.',
    });
  }

  public static unprocessableEntity({
    message = '',
  }: IUnprocessableEntityParams = {}): HttpError {
    return new HttpError({
      status: 422,
      message: message || 'Unprocessable Entity.',
    });
  }

  public static invalidParameter({
    content,
    status = 422,
    message = '',
  }: IInvalidParameterParams): HttpError {
    return new HttpError({
      status,
      message,
      content,
    });
  }
}

export default HttpError;
