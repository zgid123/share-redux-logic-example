import {
  staticImplements,
  IAuthServiceStatic,
} from '@share-redux/redux-common';

@staticImplements<IAuthServiceStatic>()
class AuthService {
  private _token?: string | null;
  private _refreshToken?: string | null;

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
    this._token = this._token || localStorage.getItem('authToken');

    return this._token;
  }

  private setToken(token: string) {
    this._token = token;
    localStorage.setItem('authToken', token);

    return this._token;
  }

  private clearToken() {
    this._token = null;
    localStorage.removeItem('authToken');
  }

  private refreshToken() {
    this._refreshToken =
      this._refreshToken || localStorage.getItem('refreshToken');

    return this._refreshToken;
  }

  private setRefreshToken(token: string) {
    this._refreshToken = token;
    localStorage.setItem('refreshToken', token);

    return this._refreshToken;
  }

  private clearRefreshToken() {
    this._refreshToken = null;
    localStorage.removeItem('refreshToken');
  }
}

export default AuthService;
