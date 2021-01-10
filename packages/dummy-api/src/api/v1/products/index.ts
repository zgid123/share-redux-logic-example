import { IEndpointConfigProps } from '@interfaces/router';
import importEndpoints from '@utils/router/importEndpoints';

const endpointConfig: IEndpointConfigProps = {
  getProducts: {
    path: '/',
    httpMethod: 'get',
  },
};

export default importEndpoints({
  endpointConfig,
  path: __dirname,
});
