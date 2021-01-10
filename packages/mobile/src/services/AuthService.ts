import AsyncStorage from '@react-native-community/async-storage';
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
    return this.instance().token();
  }

  public static setToken(token: string): Promise<string> {
    return Promise.resolve(this.instance().setToken(token));
  }

  public static clearToken(): Promise<void> {
    return Promise.resolve(this.instance().clearToken());
  }

  public static refreshToken(): Promise<string | null> {
    return this.instance().refreshToken();
  }

  public static setRefreshToken(token: string): Promise<string> {
    return Promise.resolve(this.instance().setRefreshToken(token));
  }

  public static clearRefreshToken(): Promise<void> {
    return Promise.resolve(this.instance().clearRefreshToken());
  }

  private async token() {
    this._token = this._token || (await AsyncStorage.getItem('authToken'));

    return this._token;
  }

  private setToken(token: string) {
    this._token = token;
    AsyncStorage.setItem('authToken', token);

    return this._token;
  }

  private clearToken() {
    this._token = null;
    AsyncStorage.removeItem('authToken');
  }

  private async refreshToken() {
    this._refreshToken =
      this._refreshToken || (await AsyncStorage.getItem('refreshToken'));

    return this._refreshToken;
  }

  private setRefreshToken(token: string) {
    this._refreshToken = token;
    AsyncStorage.setItem('refreshToken', token);

    return this._refreshToken;
  }

  private clearRefreshToken() {
    this._refreshToken = null;
    AsyncStorage.removeItem('refreshToken');
  }
}

export default AuthService;
