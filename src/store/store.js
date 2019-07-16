import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import { Decimal } from 'decimal.js';

import reducer from './reducers';
import sagas from './sagas';

import { appConfig } from '../config';
import { getPocketValues } from '../utils';

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const amountFrom = appConfig.amount_from && (new Decimal(appConfig.amount_from));
const amountTo = appConfig.amount_to && (new Decimal(appConfig.amount_to));

const initialStore = {
  userInputs: {
    ...appConfig,
    amount_from: amountFrom,
    amount_to: amountTo,
  },
  pocket: {
    ...getPocketValues(),
  },
};

const store = createStore(
  reducer,
  fromJS(initialStore),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);

export default store;
