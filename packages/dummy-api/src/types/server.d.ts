/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface Global {
    HttpError: typeof import('@services/HttpError').default;
    ApiResponse: typeof import('@services/ApiResponse').default;
  }
}
