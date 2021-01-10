import authReducer from './auth/slice';
import { TCombinedReducer } from '../interfaces';

const rootReducer = {
  auth: authReducer,
};

type TRawRootReducer = typeof rootReducer;

export type TCombinedRootReducer = TCombinedReducer<TRawRootReducer>;
export type TRootState = ReturnType<TCombinedRootReducer>;

export default rootReducer;
