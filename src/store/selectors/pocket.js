import Decimal from 'decimal.js';
import { createSelector } from 'reselect';

import { formatAndRound } from '../../utils';
import { getCurrencyFrom, getCurrencyTo, getAmountFrom } from './userInputs';


const getPocket = state => state.get('pocket');

export const getPocketCurrencyFrom = createSelector(
  [getPocket, getCurrencyFrom],
  (currency, from) => currency.get(from),
);

export const getPocketCurrencyTo = createSelector(
  [getPocket, getCurrencyTo],
  (currency, to) => currency.get(to),
);

export const getPocketCurrencyValue = (state, type) => createSelector(
  [getPocketCurrencyFrom, getPocketCurrencyTo],
  (from, to) => (type === 'from' ? from : to),
)(state);

export const getPocketCurrencyFormatted = (state, type) => formatAndRound(
  getPocketCurrencyValue(state, type),
);

export const isDisabled = createSelector(
  [getPocketCurrencyFrom, getAmountFrom],
  (pocketValue, amount) => !!(pocketValue.isZero()
    || (Decimal.isDecimal(amount) && pocketValue.lt(amount))),
);
