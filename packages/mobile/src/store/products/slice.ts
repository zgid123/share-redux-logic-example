import {
  createSlice,
  createAction,
  PayloadAction,
} from '@share-redux/redux-common';

import { IProductProps, TLoadingState } from './slice.interface';

interface IStateProps {
  data: IProductProps[];
  loadingState: TLoadingState;
}

export const initialState: IStateProps = {
  data: [],
  loadingState: 'loaded',
};

const productsSlice = createSlice({
  initialState,
  name: 'Products',
  reducers: {
    fetching(state) {
      state.loadingState = 'loading';
    },
    assignProducts(state, action: PayloadAction<IProductProps[]>) {
      state.loadingState = 'loaded';
      state.data = action.payload;
    },
    error(state) {
      state.loadingState = 'loaded';
    },
    clear(state) {
      state.data = initialState.data;
      state.loadingState = initialState.loadingState;
    },
  },
});

export const fetchProducts = createAction('FETCH_PRODUCTS');

const reducer = productsSlice.reducer;

export const { error, clear, fetching, assignProducts } = productsSlice.actions;

export type TProductsState = ReturnType<typeof reducer>;

export default reducer;
