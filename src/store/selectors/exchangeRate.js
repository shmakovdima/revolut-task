import { createSelector } from 'reselect';

import { formatAndRound } from '../../utils';
import { DECIMAL_PLACES_EXCHANGE } from '../../constants';

import { getCurrencyFrom, getCurrencyTo } from './userInputs';

const getExchangeRate = state => state.get('exchangeRate');
export const getExchangeRateFetching = state => getExchangeRate(state).get('fetching');
export const getExchangeRateError = state => getExchangeRate(state).get('isError');

export const getExchangeRateData = state => getExchangeRate(state).get('data');

export const getExchangeRateCurrencyFrom = createSelector(
  [getExchangeRateData, getCurrencyFrom],
  (data, currency) => (data.get(currency) ? data.get(currency) : null),
);

export const getExchangeRateCurrencyTo = createSelector(
  [getExchangeRateData, getCurrencyTo],
  (data, currency) => (data.get(currency) ? data.get(currency) : null),
);

export const getExchangeRateByCur = createSelector(
  [getExchangeRateCurrencyFrom, getExchangeRateCurrencyTo],
  (from, to) => ((from && to) ? to.dividedBy(from) : "0"),
);

export const getExchangeRateByOne = createSelector(
  getExchangeRateByCur,
  exchangeRate => formatAndRound(
    exchangeRate,
    DECIMAL_PLACES_EXCHANGE,
  ),
);
