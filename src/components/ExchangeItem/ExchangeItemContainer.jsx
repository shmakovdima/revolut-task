import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import without from 'lodash.without';

import { getCurrencyTypes } from '../../utils';
import {
  getAmountFormatted,
  getCurrency,
  getCurrencyAnother,
} from '../../store/selectors/userInputs';
import {
  getPocketCurrencyFormatted,
  isDisabled,
} from '../../store/selectors/pocket';

import {
  changeCurrencyAction,
  changeAmountAction,
} from '../../store/actions/userInputs';

import ExchangeItemView from './ExchangeItemView';

const ExchangeItem = ({
  type,
  currency,
  currencyAnother,
  changeAmount,
  ...props
}) => {
  const availableCurrencies = without(
    getCurrencyTypes(),
    currency,
    currencyAnother,
  );

  const options = availableCurrencies.map(code => ({
    value: code,
    label: code,
  }));

  const onInput = (value) => {
    const trimValue = value ? value.replace(/[^0-9.]/gi, '') : 0;
    changeAmount(parseFloat(trimValue), type);
  };

  return (
    <ExchangeItemView
      {...props}
      onInput={onInput}
      options={options}
      availableCurrencies={availableCurrencies}
      type={type}
      currency={currency}
    />
  );
};

ExchangeItem.propTypes = {
  type: PropTypes.oneOf(['to', 'from']).isRequired,
  currency: PropTypes.oneOf(getCurrencyTypes()).isRequired,
  currencyAnother: PropTypes.oneOf(getCurrencyTypes()).isRequired,
  balance: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  amount: getAmountFormatted(state, ownProps.type),
  balance: getPocketCurrencyFormatted(state, ownProps.type),
  currency: getCurrency(state, ownProps.type),
  currencyAnother: getCurrencyAnother(state, ownProps.type),
  disabled: isDisabled(state),
});

const mapDispatchToProps = dispatch => ({
  changeCurrency: (value, type) => dispatch(changeCurrencyAction({ value, type })),
  changeAmount: (value, type) => dispatch(changeAmountAction({ value, type })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(ExchangeItem));
