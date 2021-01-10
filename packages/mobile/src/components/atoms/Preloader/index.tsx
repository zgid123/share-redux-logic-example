import * as React from 'react';

import { FC } from 'react';
import LottieView from 'lottie-react-native';
import { Layout } from '@ui-kitten/components';
import {
  ViewStyle,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import isIOS from 'utils/isIOS';

interface IPreloaderProps {
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

const Preloader: FC<IPreloaderProps> = ({ style }) => {
  return (
    <SafeAreaView>
      <Layout style={[styles.container, style]}>
        {isIOS() && (
          <LottieView
            speed={1.5}
            autoPlay={true}
            source={require('./dot-typing.json')}
          />
        )}
        {!isIOS() && <ActivityIndicator size={50} color='#0080ff' />}
      </Layout>
    </SafeAreaView>
  );
};

export default Preloader;
