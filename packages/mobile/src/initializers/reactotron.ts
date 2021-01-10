import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { StoreEnhancer } from '@share-redux/redux-common';
import AsyncStorage from '@react-native-community/async-storage';

const initReactotron = (): StoreEnhancer | undefined => {
  if (!__DEV__) {
    return undefined;
  }

  Reactotron.setAsyncStorageHandler?.(AsyncStorage)
    .configure({
      name: 'Foundingbird React Native App',
    })
    .useReactNative({
      networking: {
        ignoreUrls: /\/(logs|symbolicate)$/,
        ignoreContentTypes: /^(image)\/.*$/i,
      },
    })
    .use(reactotronRedux())
    .connect();

  return Reactotron.createEnhancer?.();
};

export default initReactotron;
