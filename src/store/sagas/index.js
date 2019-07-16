import { all } from 'redux-saga/effects/';
import exchangeRate from './exchangeRate';
import userInputs from './userInputs';
import pocket from './pocket';

export default function* () {
  yield all([
    userInputs(),
    exchangeRate(),
    pocket(),
  ]);
}
