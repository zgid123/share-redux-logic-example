import { useSelector } from '@share-redux/redux-common';

import { TRootState } from '../rootReducer';
import { IProductProps, TLoadingState } from './slice.interface';

export const useRetrieveProducts = (): IProductProps[] => {
  return useSelector<TRootState, IProductProps[]>(
    (state) => state.products.data,
  );
};

export const useRetrieveLoadingState = (): TLoadingState => {
  return useSelector<TRootState, TLoadingState>(
    (state) => state.products.loadingState,
  );
};
