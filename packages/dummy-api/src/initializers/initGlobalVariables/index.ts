import HttpError from '@services/HttpError';
import ApiResponse from '@services/ApiResponse';

const initGlobalVariables = async (): Promise<void> => {
  global.HttpError = HttpError;
  global.ApiResponse = ApiResponse;
};

export default initGlobalVariables;
