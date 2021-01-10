import { TCombinedReducer } from '@share-redux/redux-common';

import productsReducer from './products/slice';

const rootReducer = {
  products: productsReducer,
};

type TRawRootReducer = typeof rootReducer;

export type TCombinedRootReducer = TCombinedReducer<TRawRootReducer>;
export type TRootState = ReturnType<TCombinedRootReducer>;

export default rootReducer;
