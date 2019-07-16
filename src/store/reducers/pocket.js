import { Map } from 'immutable';

import { EXCHANGE_SUCCESS } from '../constants/pocket';

const initialState = Map();

export default function (state = initialState, action) {
  switch (action.type) {
    case EXCHANGE_SUCCESS:
      return state.merge({ ...action.payload });
    default:
      return state;
  }
}
