export type TLoadingState = 'loaded' | 'loading' | 'autoLogingIn';

export interface IAuthStateProps {
  loadingState: TLoadingState;
  profile: {
    lastName: string;
    firstName: string;
  };
}

export interface ISignInPayloadProps {
  callback?: () => void;
  data: {
    email: string;
    password: string;
  };
}
