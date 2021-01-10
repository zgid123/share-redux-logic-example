import {
  fetchProductsEpic,
  fetchingEpic as fetchingProductEpic,
} from './products/epic';

const epics = [fetchProductsEpic, fetchingProductEpic];

export default epics;
