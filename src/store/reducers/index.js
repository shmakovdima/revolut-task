import { combineReducers } from 'redux-immutable';

import exchangeRate from './exchangeRate';
import userInputs from './userInputs';
import pocket from './pocket';

export default combineReducers({
  exchangeRate,
  userInputs,
  pocket,
});
