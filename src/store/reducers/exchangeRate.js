import { Map, fromJS } from 'immutable';
import get from 'lodash.get';
import mapValues from 'lodash.mapvalues';
import { Decimal } from 'decimal.js';

import {
  FETCH_CURRENCY,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAIL,
} from '../constants/exchangeRate';

const initialState = fromJS({
  fetching: false,
  isError: false,
  data: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENCY:
      return state.merge({ fetching: true, isError: false });
    case FETCH_CURRENCY_SUCCESS:
      return state
        .set(
          'data',
          fromJS(
            mapValues(
              get(action, 'payload.data.rates'),
              cur => new Decimal(cur),
            ),
          ),
        )
        .merge({ fetching: false, isError: false });
    case FETCH_CURRENCY_FAIL:
      return state.merge({ fetching: false, isError: true });
    default:
      return state;
  }
}
