import { createSelector } from 'reselect';
import { formatAndRound } from '../../utils';
import { DECIMAL_PLACES } from '../../constants';

const getUserInputs = state => state.get('userInputs');

export const getCurrencyFrom = state => getUserInputs(state).get('currency_from');
export const getCurrencyTo = state => getUserInputs(state).get('currency_to');

export const getCurrency = (state, type) => createSelector(
  [getCurrencyFrom, getCurrencyTo],
  (from, to) => (type === 'from' ? from : to),
)(state);

export const getCurrencyAnother = (state, type) => createSelector(
  [getCurrencyFrom, getCurrencyTo],
  (from, to) => (type === 'from' ? to : from),
)(state);

export const getAmountFrom = state => getUserInputs(state).get('amount_from');
export const getAmountTo = state => getUserInputs(state).get('amount_to');

export const getAmount = (state, type) => createSelector(
  [getAmountFrom, getAmountTo],
  (from, to) => (type === 'from' ? from : to),
)(state);

export const getAmountFormatted = (state, type) => formatAndRound(
  getAmount(state, type),
  DECIMAL_PLACES,
);

export const getUserInputLast = state => getUserInputs(state).get('active_input');
