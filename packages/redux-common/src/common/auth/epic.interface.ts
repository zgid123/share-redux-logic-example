import { IAuthStateProps } from './slice.interface';

export interface IAuthResponseProps {
  data: {
    authToken: string;
    refreshToken: string;
    profile: IAuthStateProps['profile'];
  };
}
