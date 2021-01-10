import { useSelector } from 'react-redux';

import { TRootState } from '../rootReducer';
import { IAuthStateProps } from './slice.interface';

export const useRetrieveAuthProfile = (): IAuthStateProps['profile'] => {
  return useSelector<TRootState, IAuthStateProps['profile']>(
    (state) => state.auth.profile,
  );
};

export const useRetrieveAuthLoadingState = (): IAuthStateProps['loadingState'] => {
  return useSelector<TRootState, IAuthStateProps['loadingState']>(
    (state) => state.auth.loadingState,
  );
};
