import { useToast as chakraUseToast, ToastOptions } from '@chakra-ui/react';

export interface IToastParams {
  title?: string;
  duration?: number;
  description?: string;
  position?: ToastOptions['position'];
  status?: 'error' | 'success' | 'warning' | 'info';
}

const useToast = () => {
  const chakraToast = chakraUseToast();

  return ({
    title = '',
    description,
    status = 'error',
    duration = 7 * 1000,
    position = 'top-right',
  }: IToastParams) => {
    return chakraToast({
      title,
      status,
      duration,
      position,
      description,
      isClosable: true,
    });
  };
};

export default useToast;
