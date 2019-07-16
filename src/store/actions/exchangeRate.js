import {
  FETCH_CURRENCY,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAIL,
  FETCH_CURRENCY_INIT,
} from '../constants/exchangeRate';

export const startCurrencyFetchingAction = () => ({
  type: FETCH_CURRENCY_INIT,
});

export const loadCurrencyAction = payload => ({
  type: FETCH_CURRENCY,
  payload,
});

export const loadCurrencySuccessAction = payload => ({
  type: FETCH_CURRENCY_SUCCESS,
  payload,
});

export const loadCurrencyFailAction = payload => ({
  type: FETCH_CURRENCY_FAIL,
  payload,
});
