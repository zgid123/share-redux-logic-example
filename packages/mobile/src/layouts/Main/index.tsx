import * as React from 'react';

import { FC } from 'react';
import { useRetrieveAuthProfile } from '@share-redux/redux-common/lib/common/auth/selectors';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import Home from 'screens/Home';
import SignIn from 'screens/SignIn';

type TMainStackParams = {
  Home: undefined;
  SignIn: undefined;
};

export type TMainLayoutNavigationProps = StackNavigationProp<TMainStackParams>;

const { Navigator, Screen } = createStackNavigator<TMainStackParams>();

const Main: FC = () => {
  const profile = useRetrieveAuthProfile();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {profile.firstName ? (
        <>
          <Screen name='Home' component={Home} />
        </>
      ) : (
        <>
          <Screen name='SignIn' component={SignIn} />
        </>
      )}
    </Navigator>
  );
};

export default Main;
