import { Alert, AlertButton, AlertOptions } from 'react-native';

interface IToastParams {
  title?: string;
  description?: string;
  options?: AlertOptions;
  buttons?: AlertButton[];
}

const useToast = () => {
  return ({
    buttons,
    options,
    title = '',
    description,
  }: IToastParams): void => {
    return Alert.alert(title, description, buttons, options);
  };
};

export default useToast;
