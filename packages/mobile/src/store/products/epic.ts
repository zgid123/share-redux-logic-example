/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { from, of } from 'rxjs';
import { AnyAction } from 'redux';
import { Epic, ofType } from 'redux-observable';
import { API } from '@share-redux/redux-common';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { TDependencies } from '@share-redux/redux-common/lib/interfaces';

import { IProductProps } from './slice.interface';
import { error, fetching, assignProducts } from './slice';

export const fetchingEpic: Epic = (action$) => {
  return action$.pipe(
    ofType('FETCH_PRODUCTS'),
    map(() => {
      return fetching();
    }),
  );
};

export const fetchProductsEpic: Epic<
  AnyAction,
  AnyAction,
  any,
  TDependencies
> = (action$, _state$, { toast }) => {
  return action$.pipe(
    ofType('FETCH_PRODUCTS'),
    exhaustMap(() => {
      return from(
        API.get<{ data: IProductProps[] }>({
          endpoint: '/products',
        }),
      ).pipe(
        map(({ data }) => {
          return assignProducts(data);
        }),
        catchError((e) => {
          toast?.({ description: e.message });

          return of(error());
        }),
      );
    }),
  );
};
