import {
  takeLatest, all, delay, call, put,
} from 'redux-saga/effects';
import get from 'lodash.get';

import {
  loadCurrencyAction,
  loadCurrencySuccessAction,
  loadCurrencyFailAction,
} from '../actions/exchangeRate';

import { FETCH_CURRENCY, FETCH_CURRENCY_INIT } from '../constants/exchangeRate';

import { API_DELAY } from '../../constants';

import { getCurrencyRate } from '../api';

function* fetchSagaPeriodically() {
  while (true) {
    yield put(loadCurrencyAction());
    yield delay(API_DELAY);
  }
}

function* fetchCurrency() {
  try {
    const response = yield call(getCurrencyRate);
    if (get(response, 'status') === 200) {
      yield put(loadCurrencySuccessAction({ ...response }));
    } else {
      yield put(loadCurrencyFailAction(response));
    }
  } catch (error) {
    console.error('Error', error);
    yield put(loadCurrencyFailAction(error));
  }
}

export default function* () {
  yield all([
    takeLatest(FETCH_CURRENCY_INIT, fetchSagaPeriodically),
    takeLatest(FETCH_CURRENCY, fetchCurrency),
  ]);
}
