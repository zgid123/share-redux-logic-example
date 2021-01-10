import { Platform } from 'react-native';

const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

export default isIOS;
