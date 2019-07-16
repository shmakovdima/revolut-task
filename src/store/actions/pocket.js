import { EXCHANGE_START, EXCHANGE_SUCCESS } from '../constants/pocket';

export const startExchangeAction = () => ({
  type: EXCHANGE_START,
});

export const successExchangeAction = payload => ({
  type: EXCHANGE_SUCCESS,
  payload,
});
