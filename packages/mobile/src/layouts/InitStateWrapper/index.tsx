import * as React from 'react';

import { loadAsync } from 'expo-font';
import { FC, useState, useEffect } from 'react';
import { useDispatch } from '@share-redux/redux-common';
import { autoLogin } from '@share-redux/redux-common/lib/common/auth/slice';
import { useRetrieveAuthLoadingState } from '@share-redux/redux-common/lib/common/auth/selectors';

import Preloader from 'components/atoms/Preloader';

const InitStateWrapper: FC = ({ children }) => {
  const dispatch = useDispatch();
  const authLoadingState = useRetrieveAuthLoadingState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAsync({
      'OpenSans-Bold': require('assets/fonts/OpenSans-Bold.ttf'),
      'Roboto-Regular': require('assets/fonts/Roboto-Regular.ttf'),
      'OpenSans-Regular': require('assets/fonts/OpenSans-Regular.ttf'),
      'Merriweather-Bold': require('assets/fonts/Merriweather-Bold.ttf'),
      'OpenSans-SemiBold': require('assets/fonts/OpenSans-SemiBold.ttf'),
      'RobotoMono-Regular': require('assets/fonts/RobotoMono-Regular.ttf'),
      'Merriweather-Regular': require('assets/fonts/Merriweather-Regular.ttf'),
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  if (authLoadingState === 'autoLogingIn' || isLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
};

export default InitStateWrapper;
