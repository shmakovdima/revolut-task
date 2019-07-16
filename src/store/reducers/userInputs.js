import { Map, fromJS } from 'immutable';

import {
  CHANGE_CURRENCY,
  CHANGE_AMOUNT_RESULT,
  CHANGE_ACTIVE_INPUT,
  CHANGE_AMOUNT_FROM,
  CHANGE_AMOUNT_TO,
  SWAP_CURRENCY_CHANGED,
} from '../constants/userInputs';

const initialState = Map();

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return state.set(`currency_${action.payload.type}`, action.payload.value);
    case SWAP_CURRENCY_CHANGED:
      return state.merge(
        fromJS({
          currency_to: action.payload.currencyTo,
          currency_from: action.payload.currencyFrom,
          amount_to: action.payload.amountTo,
          amount_from: action.payload.amountFrom,
        }),
      );
    case CHANGE_AMOUNT_RESULT:
      return state.merge(
        fromJS({
          amount_to: action.payload.amountTo,
          amount_from: action.payload.amountFrom,
        }),
      );
    case CHANGE_AMOUNT_FROM:
      return state.set('amount_from', action.payload);
    case CHANGE_AMOUNT_TO:
      return state.set('amount_to', action.payload);
    case CHANGE_ACTIVE_INPUT:
      return state.set('active_input', fromJS(action.payload));
    default:
      return state;
  }
}
