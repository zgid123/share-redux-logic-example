import { IEndpointConfigProps } from '@interfaces/router';
import importEndpoints from '@utils/router/importEndpoints';

const endpointConfig: IEndpointConfigProps = {
  login: {
    path: '/login',
    httpMethod: 'post',
  },
  refreshToken: {
    path: '/refresh',
    httpMethod: 'post',
  },
};

export default importEndpoints({
  endpointConfig,
  path: __dirname,
});
