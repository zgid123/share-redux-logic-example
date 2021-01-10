import * as React from 'react';

import { FC, useLayoutEffect } from 'react';
import { useDispatch } from '@share-redux/redux-common';
import { autoLogin } from '@share-redux/redux-common/lib/common/auth/slice';
import { useRetrieveAuthLoadingState } from '@share-redux/redux-common/lib/common/auth/selectors';

import Preloader from 'components/Preloader';

const InitStateWrapper: FC = ({ children }) => {
  const dispatch = useDispatch();
  const authLoadingState = useRetrieveAuthLoadingState();

  useLayoutEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  if (authLoadingState === 'autoLogingIn') {
    return <Preloader />;
  }

  return <>{children}</>;
};

export default InitStateWrapper;
