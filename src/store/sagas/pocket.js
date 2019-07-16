import {
  takeLatest, all, put, select,
} from 'redux-saga/effects';
import { Decimal } from 'decimal.js';

import {
  getAmountFrom,
  getAmountTo,
  getCurrencyFrom,
  getCurrencyTo,
} from '../selectors/userInputs';

import { EXCHANGE_START } from '../constants/pocket';

import { changeAmountResultAction } from '../actions/userInputs';
import { successExchangeAction } from '../actions/pocket';

import {
  getPocketCurrencyFrom,
  getPocketCurrencyTo,
} from '../selectors/pocket';

function* startExchange() {
  const amountFrom = yield select(getAmountFrom);
  const amountTo = yield select(getAmountTo);
  const currencyFrom = yield select(getCurrencyFrom);
  const currencyTo = yield select(getCurrencyTo);

  const pocketFrom = yield select(getPocketCurrencyFrom);
  const pocketTo = yield select(getPocketCurrencyTo);

  const pocketFromNew = Decimal.isDecimal(amountFrom)
    ? pocketFrom.minus(amountFrom)
    : pocketFrom;
  const pocketToNew = Decimal.isDecimal(amountTo)
    ? pocketTo.minus(amountTo)
    : pocketTo;

  yield put(changeAmountResultAction({ amountFrom: '', amountTo: '' }));
  yield put(
    successExchangeAction({
      [currencyFrom]: pocketFromNew,
      [currencyTo]: pocketToNew,
    }),
  );
}

export default function* () {
  yield all([takeLatest(EXCHANGE_START, startExchange)]);
}
