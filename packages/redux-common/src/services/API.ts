/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import { stringifyUrl, ParsedQuery } from 'query-string';
import Axios, {
  CancelToken,
  CancelTokenStatic,
  AxiosRequestConfig,
} from 'axios';

import AuthService from './Auth';
import axiosErrorParser from '../utils/parser/axiosErrorParser';

interface IOptionsParams {
  requiredAuth: boolean;
  headers?: AxiosRequestConfig['headers'];
}

interface IOptionsResult {
  [key: string]: string | object;
}

interface IRequestProps {
  endpoint: string;
  version?: number;
  requiredAuth?: boolean;
  cancelToken?: CancelToken;
  headers?: AxiosRequestConfig['headers'];
  method: 'get' | 'post' | 'put' | 'delete';
}

interface IRequestBody {
  data?: object;
  onUploadProgress?: AxiosRequestConfig['onUploadProgress'];
}

interface IRequestParams {
  params?: object;
}

interface IGetParams {
  query?: {
    [key: string]: string | number;
  };
}

/* eslint-disable @typescript-eslint/indent */
type TGetParams = IGetParams &
  IRequestParams &
  Exclude<Omit<IRequestProps, 'method'>, IRequestBody>;
/* eslint-enable @typescript-eslint/indent */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAuthService {}

export interface IAuthServiceStatic {
  new (): IAuthService;
  clearToken: () => Promise<void>;
  token: () => Promise<string | null>;
  clearRefreshToken: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
  setToken: (params: string) => Promise<string>;
  setRefreshToken: (params: string) => Promise<string>;
}

export interface IConfigParams {
  endpoint: string;
  authService: IAuthServiceStatic;
}

class API {
  private _endpoint: string;
  private _cancelToken: CancelTokenStatic;
  private _authService: IAuthServiceStatic = AuthService;

  private static _instance: API;

  private constructor() {
    this._endpoint = 'http://localhost:3000/api';
    this._cancelToken = Axios.CancelToken;
  }

  private static instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public static config({ endpoint, authService }: IConfigParams): typeof API {
    const instance = this.instance();

    instance._endpoint = endpoint;
    instance._authService = authService;

    return this;
  }

  public static get<T extends any>({
    query,
    endpoint,
    ...options
  }: TGetParams): Promise<T> {
    if (query) {
      endpoint = stringifyUrl({
        url: endpoint,
        query: query as ParsedQuery,
      });
    }

    return this.request({ method: 'get', endpoint, ...options });
  }

  public static post<T extends any>({
    endpoint,
    ...options
  }: Omit<IRequestProps, 'method'> & IRequestBody): Promise<T> {
    return this.request({ method: 'post', endpoint, ...options });
  }

  public static put({
    endpoint,
    ...options
  }: Omit<IRequestProps, 'method'> & IRequestBody): Promise<any> {
    return this.request({ method: 'put', endpoint, ...options });
  }

  public static delete({
    endpoint,
    ...options
  }: Omit<IRequestProps, 'method'> & IRequestBody): Promise<any> {
    return this.request({ method: 'delete', endpoint, ...options });
  }

  public static get CancelToken(): CancelTokenStatic {
    return this.instance()._cancelToken;
  }

  public static get Auth(): IAuthServiceStatic {
    return this.instance()._authService;
  }

  private static async options({ requiredAuth, headers = {} }: IOptionsParams) {
    let options = {} as IOptionsResult;
    const authToken = await this.instance()._authService?.token();

    if (requiredAuth && authToken) {
      options = {
        ...options,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
    }

    options.headers = { ...(options.headers as object), ...headers };

    return options;
  }

  private static async request({
    data,
    params,
    headers,
    endpoint,
    version = 1,
    method = 'get',
    onUploadProgress,
    requiredAuth = true,
  }: IRequestProps & IRequestBody & IRequestParams) {
    const { _endpoint, _authService } = this.instance();
    const options = await this.options({ requiredAuth, headers });

    return Axios.request({
      ...omitBy(
        {
          data,
          params,
          method,
          url: `${_endpoint}/v${version}/${endpoint.replace(/^\//, '')}`,
        },
        (value) => !(value instanceof FormData) && isEmpty(value),
      ),
      ...options,
      onUploadProgress,
    })
      .then((response) => {
        return response.data;
      })
      .catch(
        axiosErrorParser((error) => {
          if (error.status === 401) {
            _authService?.clearToken();
          }

          return Promise.reject(error);
        }),
      );
  }
}

export default API;
