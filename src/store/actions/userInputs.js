import {
  CHANGE_CURRENCY,
  CHANGE_AMOUNT,
  CHANGE_AMOUNT_FROM,
  CHANGE_AMOUNT_TO,
  CHANGE_AMOUNT_RECALC,
  CHANGE_AMOUNT_RESULT,
  CHANGE_ACTIVE_INPUT,
  SWAP_CURRENCY,
  SWAP_CURRENCY_CHANGED,
} from '../constants/userInputs';

export const changeCurrencyAction = payload => ({
  type: CHANGE_CURRENCY,
  payload,
});

export const swapCurrencyAction = () => ({
  type: SWAP_CURRENCY,
});

export const swapCurrencyChangedAction = payload => ({
  type: SWAP_CURRENCY_CHANGED,
  payload,
});

export const changeAmountAction = payload => ({
  type: CHANGE_AMOUNT,
  payload,
});

export const changeAmountFromAction = payload => ({
  type: CHANGE_AMOUNT_FROM,
  payload,
});

export const changeAmountToAction = payload => ({
  type: CHANGE_AMOUNT_TO,
  payload,
});

export const changeAmountRecalcAction = () => ({
  type: CHANGE_AMOUNT_RECALC,
});

export const changeAmountResultAction = payload => ({
  type: CHANGE_AMOUNT_RESULT,
  payload,
});

export const changeActiveInputAction = payload => ({
  type: CHANGE_ACTIVE_INPUT,
  payload,
});
