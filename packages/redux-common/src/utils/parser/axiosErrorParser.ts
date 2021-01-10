import { AxiosError } from 'axios';

interface IContentProps {
  [key: string]: string | number | boolean | IContentProps;
}

export interface IErrorProps {
  code?: number;
  status?: number;
  message?: string;
  content?: IContentProps;
}

const axiosErrorParser = (callback: (error: IErrorProps) => void) => {
  return ({ response }: AxiosError): void => {
    const { status, data } = response || {
      status: 500,
      data: { message: 'Something went wrong!' },
    };

    return callback({ ...data, status });
  };
};

export default axiosErrorParser;
