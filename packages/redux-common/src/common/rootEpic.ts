import {
  autoLoginEpic,
  clearAuthEpic,
  authenticateEpic,
  authenticatingEpic,
  refreshAuthTokenEpic,
} from './auth/epic';

const epics = [
  autoLoginEpic,
  clearAuthEpic,
  authenticateEpic,
  authenticatingEpic,
  refreshAuthTokenEpic,
];

export default epics;
