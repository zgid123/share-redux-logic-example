import { IAuthServiceStatic } from './API';
import { staticImplements } from '../utils/interfaceHelpers';

@staticImplements<IAuthServiceStatic>()
class AuthService {
  private _token: string | null = null;
  private _refreshToken: string | null = null;

  private static _instance: AuthService;

  private static instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public static token(): Promise<string | null> {
    return Promise.resolve(this.instance().token());
  }

  public static setToken(token: string): Promise<string> {
    return Promise.resolve(this.instance().setToken(token));
  }

  public static clearToken(): Promise<void> {
    return Promise.resolve(this.instance().clearToken());
  }

  public static refreshToken(): Promise<string | null> {
    return Promise.resolve(this.instance().refreshToken());
  }

  public static setRefreshToken(token: string): Promise<string> {
    return Promise.resolve(this.instance().setRefreshToken(token));
  }

  public static clearRefreshToken(): Promise<void> {
    return Promise.resolve(this.instance().clearRefreshToken());
  }

  private token() {
    return this._token;
  }

  private setToken(token: string) {
    this._token = token;

    return this._token;
  }

  private clearToken() {
    this._token = null;
  }

  private refreshToken() {
    return this._refreshToken;
  }

  private setRefreshToken(token: string) {
    this._refreshToken = token;

    return this._refreshToken;
  }

  private clearRefreshToken() {
    this._refreshToken = null;
  }
}

export default AuthService;
