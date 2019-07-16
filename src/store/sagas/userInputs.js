import {
  takeLatest, all, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  CHANGE_AMOUNT,
  CHANGE_AMOUNT_TO,
  CHANGE_AMOUNT_FROM,
  CHANGE_CURRENCY,
  SWAP_CURRENCY,
  SWAP_CURRENCY_CHANGED,
} from '../constants/userInputs';

import { FETCH_CURRENCY_SUCCESS } from '../constants/exchangeRate';

import {
  getUserInputLast,
  getAmountFrom,
  getAmountTo,
  getCurrencyFrom,
  getCurrencyTo,
} from '../selectors/userInputs';

import { getExchangeRateByCur } from '../selectors/exchangeRate';

import {
  changeAmountResultAction,
  changeActiveInputAction,
  changeAmountFromAction,
  changeAmountToAction,
  swapCurrencyChangedAction,
} from '../actions/userInputs';

function* changeAmount(action) {
  let lastInput = yield select(getUserInputLast);
  const lastInputType = action.payload.type;
  const newValue = action.payload.value;

  if (lastInput !== lastInputType) {
    yield put(changeActiveInputAction(lastInputType));
    lastInput = lastInputType;
  }

  yield put(
    lastInput === 'from'
      ? changeAmountFromAction(newValue)
      : changeAmountToAction(newValue),
  );
}

function* recalc() {
  const lastInput = yield select(getUserInputLast);
  const exchangeRate = yield select(getExchangeRateByCur);
  const newValue = yield select(
    lastInput === 'from' ? getAmountFrom : getAmountTo,
  );

  const newAmountFromCalc = newValue ? newValue.dividedBy(exchangeRate) : '';
  const newAmountToCalc = newValue ? newValue.times(exchangeRate) : '';

  const newAmountFrom = lastInput === 'from' ? newValue : newAmountFromCalc;
  const newAmountTo = lastInput === 'to' ? newValue : newAmountToCalc;

  yield put(
    changeAmountResultAction({
      amountFrom: newAmountFrom,
      amountTo: newAmountTo,
    }),
  );
}

function* swapCurrency() {
  const currencyFrom = yield select(getCurrencyFrom);
  const currencyTo = yield select(getCurrencyTo);

  const amountFrom = yield select(getAmountFrom);
  const amountTo = yield select(getAmountTo);

  yield put(
    swapCurrencyChangedAction({
      currencyFrom: currencyTo,
      currencyTo: currencyFrom,
      amountFrom: amountTo,
      amountTo: amountFrom,
    }),
  );
}

export default function* () {
  yield all([
    takeLatest(CHANGE_AMOUNT, changeAmount),
    takeLatest(SWAP_CURRENCY, swapCurrency),
    takeEvery(
      [
        CHANGE_AMOUNT_TO,
        CHANGE_AMOUNT_FROM,
        CHANGE_CURRENCY,
        SWAP_CURRENCY_CHANGED,
        FETCH_CURRENCY_SUCCESS,
      ],
      recalc,
    ),
  ]);
}
